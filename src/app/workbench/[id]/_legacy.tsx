'use client';

import React from 'react';
import { usePutSurvey, useGetSurvey } from '@/components/workbench/service';
import Loading from '@/components/ui/loading/Loading';
import { useSurveyStore } from '@/components/workbench/store';
import { cin, cout, validate } from '@/components/workbench/func';
import { v4 as uuid } from 'uuid';
import Modal from '@/components/ui/modal/Modal';
import ErrorItem from '@/components/workbench/ui/error-item';
import Header from '@/components/workbench/ui/header';
import useModal from '@/hooks/useModal';
import { ErrorDescriptor, Store } from '@/components/workbench/types';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import Tab1 from './tab1';
import Tab0 from './tab0';
import Tab2 from './tab2';
import styles from './page.module.css';

const getTabFromSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  const arg = Number(searchParams.get('tab'));
  if (!Number.isNaN(arg) && arg >= 0 && arg < 4) return arg;
  return 0;
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();

  // Tab state
  const [tab, setTab] = React.useState(getTabFromSearchParams(searchParams));

  const tabHandler = (newTab: number) => {
    setTab(newTab);
    replaceURLSearchParams('tab', newTab);
  };

  // Store data from the state
  const store: Store = useSurveyStore((state) => ({
    title: state.title,
    description: state.description,
    thumbnail: state.thumbnail,
    publishedAt: state.publishedAt,
    finishMessage: state.finishMessage,
    status: state.status,
    isVisible: state.isVisible,
    rewardConfig: state.rewardConfig,
    sections: state.sections,
    fields: state.fields,
  }));

  // Fetch survey data and initialize store
  const { data, isLoading } = useGetSurvey(id);
  const initStore = useSurveyStore((state) => state.initStore);

  React.useEffect(() => {
    if (data) initStore({ store: cin(data) });
  }, [data, initStore]);

  // Modal state and error handling
  const { isOpen, openModal, closeModal } = useModal();
  const [errors, setErrors] = React.useState<ErrorDescriptor[]>([]);

  const handleValidate = () => {
    const validationResult = validate(store);
    if (validationResult.valid) {
      setErrors([]);
      return true;
    }
    setErrors(validationResult.reason);
    openModal();
    return false;
  };

  // Handle submit
  const { mutate } = usePutSurvey(
    id,
    () => alert('저장 성공'),
    () => alert('저장 실패')
  );
  const handleSubmit = () => {
    if (!handleValidate()) {
      openModal();
      return;
    }
    const outStore = cout(store);
    mutate(outStore);
  };

  // Render content based on tab and loading state
  const renderContent = () => {
    if (isLoading) return <Loading message="설문지를 불러오는 중..." />;
    switch (tab) {
      case 0:
        return <Tab0 />;
      case 1:
        return <Tab1 />;
      case 2:
        return <Tab2 />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Modal isOpen={isOpen} onClose={closeModal} title={`저장 실패 사유 (${errors.length})`}>
        <h3>다음 문제를 모두 해결해야 저장할 수 있습니다.</h3>
        <div>
          {errors.map(({ reason, location }) => (
            <ErrorItem key={uuid()} reason={reason} location={location} />
          ))}
        </div>
      </Modal>
      <Header tab={tab} tabHandler={tabHandler} errors={errors} handleSubmit={handleSubmit} />
      {renderContent()}
    </div>
  );
}
