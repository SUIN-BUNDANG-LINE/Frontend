'use client';

import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams, useRouter } from 'next/navigation';
import { replaceURLSearchParams, deleteURLSearchParam } from '@/utils/url-search-params';
import { useGetSurvey } from '@/components/workbench/service';
import Header from '@/components/management/ui/Header';
import { showToast } from '@/utils/toast';
import { Footer } from '@/components/layout/main';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import styles from './page.module.css';
import Tab0 from './tab0';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';

const getTabFromSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  const arg = Number(searchParams.get('tab'));
  if (!Number.isNaN(arg) && arg >= 0 && arg < 4) return arg;
  return 0;
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const {
    isLoading: visitorLoading,
    error: visitorError,
    data: visitorData,
  } = useVisitorData({ extendedResult: true }, { immediate: true });

  const searchParams = useSearchParams();
  const [tab, setTab] = React.useState(getTabFromSearchParams(searchParams));
  const isGuest = searchParams.get('isGuest') === 'true';
  const { data } = useGetSurvey(id);

  const tabHandler = (newTab: number) => {
    setTab(newTab);
    replaceURLSearchParams('tab', newTab);
    deleteURLSearchParam('participantId');
  };

  if (data && ['NOT_STARTED', 'IN_MODIFICATION'].includes(data.status)) {
    showToast('error', '접근할 수 없습니다.');
    router.push('/mypage');
  }

  let content;

  if (isGuest && visitorLoading)
    content = (
      <div className={styles.loading}>
        <Loading message="데이터를 불러오는 중..." />
      </div>
    );
  else if (isGuest && visitorError)
    content = (
      <div className={styles.error}>
        <Error message="데이터를 불러오지 못했습니다." buttons={[]} margin="18px" />
      </div>
    );
  else if (tab === 0) content = <Tab0 surveyId={id} visitorId={isGuest ? visitorData?.visitorId : undefined} />;
  else if (tab === 1)
    content = <Tab1 surveyId={id} setTab={setTab} visitorId={isGuest ? visitorData?.visitorId : undefined} />;
  else if (tab === 2)
    content = (
      <Tab2
        surveyId={id}
        participantId={searchParams.get('participantId')}
        visitorId={isGuest ? visitorData?.visitorId : undefined}
      />
    );
  else if (tab === 3 && !isGuest)
    content = <Tab3 surveyId={id} initialIsFinished={data ? data.status === 'CLOSED' : undefined} />;

  return (
    <div className={styles.app}>
      <Header tab={tab} tabHandler={tabHandler} title={data?.title} isGuest={isGuest} />
      {content}
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
