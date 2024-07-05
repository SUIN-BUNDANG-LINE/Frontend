'use client';

import { response } from '@/app/(main)/DUMMY_RESPONSE';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { replaceURLSearchParams } from '@/utils';
import SurveyFinderList from './list/List';
import SurveyFinderCustomize from './control/Customize';
import SurveyFinderPagination from './control/Pagination';

const sortOptions = [
  { value: 'new', label: '최신순' },
  { value: 'trend', label: '인기순' },
];

function SurveyFinder() {
  const searchParams = useSearchParams();

  const { data } = response;
  const { pageCount, surveys } = data;

  const [sort, setSort] = useState<string>(searchParams.get('sort') || sortOptions[0].value);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

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
      <SurveyFinderCustomize sort={sort} setSortHandler={setSortHandler} sortOptions={sortOptions} />
      <SurveyFinderList surveys={surveys} />
      <SurveyFinderPagination page={page} setPageHandler={setPageHandler} maxPage={pageCount} />
    </>
  );
}

export default SurveyFinder;
