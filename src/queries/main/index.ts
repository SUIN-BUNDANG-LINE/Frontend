import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getSurveyList } from '../DUMMY_API';

const queryKeys = {
  root: ['main'],
  list: (sort: string, page: number) => [...queryKeys.root, 'list', sort, page],
};

function useSurveyList(sort: string, page: number) {
  return useQuery({
    queryKey: queryKeys.list(sort, page),
    queryFn: () => getSurveyList(sort, page),
    select: ({ data }) => data,
    placeholderData: keepPreviousData,
  });
}

export { useSurveyList };
