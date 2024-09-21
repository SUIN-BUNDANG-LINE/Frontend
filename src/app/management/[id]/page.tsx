'use client';

import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import { useGetSurvey } from '@/components/workbench/service';
import Header from '@/components/management/ui/Header';
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
  const { id } = params;

  const searchParams = useSearchParams();
  const [tab, setTab] = React.useState(getTabFromSearchParams(searchParams));
  const { data } = useGetSurvey(id);

  const tabHandler = (newTab: number) => {
    setTab(newTab);
    replaceURLSearchParams('tab', newTab);
  };

  let content;
  if (tab === 0) content = <Tab0 surveyId={id} />;
  else if (tab === 1) content = <Tab1 />;
  else if (tab === 2) content = <Tab2 />;
  else if (tab === 3) content = <Tab3 />;

  return (
    <div className={styles.app}>
      <Header tab={tab} tabHandler={tabHandler} title={data?.title} />
      {content}
    </div>
  );
}
