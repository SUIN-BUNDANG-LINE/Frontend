'use client';

import { useState } from 'react';
import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import { useSurveysList } from '@/services/surveys';
import List from './list/List';
import Customize from './control/Customize';
import Pagination from './control/Pagination';

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

  const { data, isLoading } = useSurveysList(sort, page);

  if (!data || isLoading) {
    return <div>loading...</div>;
  }

  const { pageCount, surveys } = data;

  const setSortHandler = (value: string) => {
    setSort(value);
    replaceURLSearchParams('sort', value);
  };

  const setPageHandler = (value: number) => {
    if (value < 1 || value > pageCount) return;
    setPage(value);
    replaceURLSearchParams('page', value);
  };

  return (
    <>
      <Customize sort={sort} setSortHandler={setSortHandler} sortOptions={SORT_OPTIONS} />
      <List surveys={surveys} />
      <Pagination page={page} setPageHandler={setPageHandler} maxPage={pageCount} />
    </>
  );
}
