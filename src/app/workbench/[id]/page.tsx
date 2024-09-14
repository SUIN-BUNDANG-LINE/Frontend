'use client';

import Header from '@/components/workbench/ui/header';
import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import { useWorkbenchSurvey } from '@/components/workbench/service';
import Loading from '@/components/ui/loading/Loading';
import { useSurveyStore } from '@/components/workbench/store';
import { cin } from '@/components/workbench/func';
import styles from './layout.module.css';
import Tab1 from './tab1';
import Tab0 from './tab0';

const getTabFromSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  const arg = Number(searchParams.get('tab'));
  if (!Number.isNaN(arg) && arg >= 0 && arg < 4) return arg;
  return 0;
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const searchParams = useSearchParams();
  const [tab, setTab] = React.useState(getTabFromSearchParams(searchParams));
  const { data, isLoading } = useWorkbenchSurvey(id);

  const initStore = useSurveyStore((state) => state.initStore);

  React.useEffect(() => {
    if (!data) return;
    initStore({ store: cin(data) });
  }, [data, initStore]);

  const tabHandler = (newTab: number) => {
    setTab(newTab);
    replaceURLSearchParams('tab', newTab);
  };

  let content = <Loading message="설문지를 불러오는 중..." />;
  if (!isLoading) {
    if (tab === 0) content = <Tab0 />;
    if (tab === 1) content = <Tab1 />;
  }

  return (
    <div className={styles.app}>
      <Header tab={tab} tabHandler={tabHandler} />
      {/* <textarea rows={30} cols={30} value={JSON.stringify(data || {}, null, 2)} readOnly /> */}
      {content}
    </div>
  );
}
