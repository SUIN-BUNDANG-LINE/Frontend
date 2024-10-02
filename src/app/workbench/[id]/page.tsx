'use client';

import React from 'react';
import { usePutSurvey, useGetSurvey } from '@/components/workbench/service';
import Loading from '@/components/ui/loading/Loading';
import { useSurveyStore } from '@/components/workbench/store';
import { cin, cout, extractStore } from '@/components/workbench/func';
import Header from '@/components/workbench/ui/Header';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import { showToast } from '@/utils/toast';
import { ErrorCause } from '@/services/ky-wrapper';
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
  const router = useRouter();

  // Tab state
  const [tab, setTab] = React.useState(getTabFromSearchParams(searchParams));

  const tabHandler = (newTab: number) => {
    setTab(newTab);
    replaceURLSearchParams('tab', newTab);
  };

  // Fetch survey data and initialize store
  const { data, isLoading } = useGetSurvey(id);
  const [authorized, setAuthorized] = React.useState(false);
  const store = useSurveyStore(extractStore);
  const initStore = useSurveyStore((state) => state.initStore);

  React.useEffect(() => {
    if (!data) return;
    if (!['IN_MODIFICATION', 'NOT_STARTED'].includes(data.status)) return;
    initStore({ store: cin(data) });
    setAuthorized(true);
  }, [data, initStore, router]);

  // Handle submit
  const { mutate, isPending } = usePutSurvey(
    id,
    () => {
      /* 저장 성공 */
    },
    (error: Error) => {
      const { message } = error.cause as ErrorCause;
      showToast('error', `저장 실패 : ${message || '알 수 없는 오류입니다.'}`);
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
    if (!authorized || isLoading) return <Loading message="설문지를 불러오는 중..." />;
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
  }, [authorized, isLoading, tab, id]);

  if (data && !['IN_MODIFICATION', 'NOT_STARTED'].includes(data.status)) {
    showToast('error', '접근할 수 없습니다.');
    router.push('/mypage');
  }

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
