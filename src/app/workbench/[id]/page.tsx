'use client';

import React from 'react';
import { usePutSurvey, useGetSurvey } from '@/components/workbench/service';
import Loading from '@/components/ui/loading/Loading';
import { Actions, useSurveyStore } from '@/components/workbench/store';
import { cin, cout } from '@/components/workbench/func';
import Header from '@/components/workbench/ui/Header';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import { Store } from '@/components/workbench/types';
import Tab1 from './tab1';
import Tab0 from './tab0';
import Tab2 from './tab2';
import styles from './page.module.css';

const getTabFromSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  const arg = Number(searchParams.get('tab'));
  if (!Number.isNaN(arg) && arg >= 0 && arg < 4) return arg;
  return 0;
};

const extractStore = (state: Store & Actions) => ({
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
});

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();

  // Tab state
  const [tab, setTab] = React.useState(getTabFromSearchParams(searchParams));

  const tabHandler = (newTab: number) => {
    setTab(newTab);
    replaceURLSearchParams('tab', newTab);
  };

  // Fetch survey data and initialize store
  const { data, isLoading } = useGetSurvey(id);
  const store = useSurveyStore(extractStore);
  const initStore = useSurveyStore((state) => state.initStore);

  React.useEffect(() => {
    if (data) initStore({ store: cin(data) });
  }, [data, initStore]);

  // Handle submit
  const { mutate, isPending } = usePutSurvey(
    id,
    () => {
      /* 저장 성공 */
    },
    () => {
      /* 저장 실패 */
    }
  );

  const handleSubmit = React.useCallback(() => {
    const outStore = cout(store);
    mutate(outStore);
  }, [mutate, store]);

  // Store data from the state
  const timeoutId = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const unsubscribe = useSurveyStore.subscribe(extractStore, (changes) => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => mutate(cout(changes)), 1000);
    });
    return () => unsubscribe();
  }, [mutate]);

  // Render content based on tab and loading state
  const content = React.useMemo(() => {
    if (isLoading) return <Loading message="설문지를 불러오는 중..." />;
    switch (tab) {
      case 0:
        return <Tab0 />;
      case 1:
        return <Tab1 />;
      case 2:
        return <Tab2 surveyId={id} />;
      default:
        return null;
    }
  }, [tab, isLoading]);

  return (
    <div className={styles.app}>
      <Header
        tab={tab}
        tabHandler={tabHandler}
        isPending={isPending}
        errors={[]}
        handleSubmit={handleSubmit}
        surveyId={id}
      />
      {content}
    </div>
  );
}
