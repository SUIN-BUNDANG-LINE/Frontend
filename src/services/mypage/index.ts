import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getMySurveys } from '@/services/mypage/fetch';
import type { StatusForFilter, SortType } from './types';

const queryKeys = {
  mySurveys: (statusForFilter: StatusForFilter, sortType: SortType) => ['mySurveys', statusForFilter, sortType],
};

const useMySurveys = (statusForFilter: StatusForFilter, sortType: SortType) => {
  return useQuery({
    queryKey: queryKeys.mySurveys(statusForFilter, sortType),
    queryFn: () => getMySurveys(statusForFilter, sortType),
    placeholderData: keepPreviousData,
  });
};

export { useMySurveys };
