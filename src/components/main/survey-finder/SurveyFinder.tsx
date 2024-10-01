'use client';

import { useState } from 'react';
import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import { useSurveysList } from '@/services/surveys';
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import Button from '@/components/ui/button/Button';
import List from './list/List';
import Customize from './control/Customize';
import Pagination from './control/Pagination';
import styles from './SurveyFinder.module.css';

const SORT_OPTIONS = [{ value: 'RECENT', label: '최신순' }];

const getSortFromSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  const arg = searchParams.get('sort');
  const tar = SORT_OPTIONS.find((option) => option.value === arg);
  return tar ? tar.value : SORT_OPTIONS[0].value;
};

export default function SurveyFinder() {
  const searchParams = useSearchParams();

  const [sort, setSort] = useState<string>(getSortFromSearchParams(searchParams));
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const { data, isLoading, isError, refetch } = useSurveysList(sort, page);

  const { pageCount, surveys } = data || { pageCount: 1, surveys: [] };

  const setSortHandler = (value: string) => {
    setSort(value);
    replaceURLSearchParams('sort', value);
  };

  const setPageHandler = (value: number) => {
    if (value < 1 || value > pageCount) return;
    setPage(value);
    replaceURLSearchParams('page', value);
  };

  const content = (() => {
    if (isLoading) return <Loading message="데이터를 불러오는 중..." />;
    if (isError || !data) {
      return (
        <Error message="설문조사를 불러오지 못했습니다." buttons={[{ text: '재시도', fn: refetch }]} margin="18px" />
      );
    }
    if (data.surveys.length === 0) {
      return (
        <div className={styles.empty}>
          <div>조건에 맞는 설문조사를 하나도 찾지 못했습니다.</div>
          <Button variant="primary" onClick={() => setPageHandler(1)}>
            초기화
          </Button>
        </div>
      );
    }
    return <List surveys={surveys} />;
  })();

  return (
    <>
      <Customize sort={sort} setSortHandler={setSortHandler} sortOptions={SORT_OPTIONS} />
      {content}
      <Pagination page={page} setPageHandler={setPageHandler} maxPage={pageCount} />
    </>
  );
}
