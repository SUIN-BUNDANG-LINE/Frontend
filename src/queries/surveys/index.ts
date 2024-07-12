import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchSurveysDetails, fetchSurveysList } from '../api';
import { SurveysListParams } from '../types';

const queryKeys = {
  root: ['surveys'],
  list: (sort: string, page: number) => [...queryKeys.root, 'list', sort, page],
  details: (surveyId: string) => [...queryKeys.root, 'details', surveyId],
};

function useSurveysList(sort: string, page: number) {
  return useQuery({
    queryKey: queryKeys.list(sort, page),
    queryFn: () =>
      fetchSurveysList({
        size: 8,
        sortType: sort as SurveysListParams['sortType'],
        page: page - 1,
        isAsc: false,
      }),
    placeholderData: keepPreviousData,
  });
}

function useSurveysDetails(surveyId: string) {
  return useQuery({
    queryKey: queryKeys.details(surveyId),
    queryFn: () => fetchSurveysDetails({ surveyId }),
  });
}

export { useSurveysDetails, useSurveysList };
