import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';
import { fetchSurveysList, fetchSurveysDetails, fetchSurveysProgress, fetchSurveysResponse } from './fetch';
import { toSurvey } from './select';
import type { SurveysListParams, SurveysProgressResponse } from './types';

const queryKeys = {
  root: ['surveys'],
  list: (sort: string, page: number, reward: boolean | undefined, resultOpen: boolean | undefined) => [
    ...queryKeys.root,
    'list',
    sort,
    page,
    reward,
    resultOpen,
  ],
  details: (surveyId: string) => [...queryKeys.root, 'details', surveyId],
  progress: (surveyId: string) => [...queryKeys.root, 'progress', surveyId],
};

const useSurveysList = (sort: string, page: number, reward: boolean | undefined, resultOpen: boolean | undefined) => {
  return useQuery({
    queryKey: queryKeys.list(sort, page, reward, resultOpen),
    queryFn: () =>
      fetchSurveysList({
        size: 8,
        sortType: sort as SurveysListParams['sortType'],
        page: page - 1,
        reward,
        resultOpen,
      }),
    placeholderData: keepPreviousData,
  });
};

const useSurveysDetails = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.details(surveyId),
    queryFn: () => fetchSurveysDetails({ surveyId }),
  });
};

const useSurveysProgress = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.progress(surveyId),
    queryFn: () => fetchSurveysProgress({ surveyId }),
    select: (data) => toSurvey(data as SurveysProgressResponse),
  });
};

const useSurveysResponse = (surveyId: string) => {
  return useMutation({
    mutationFn: (response: object) => fetchSurveysResponse({ surveyId, responseBody: response }),
  });
};

export { useSurveysList, useSurveysDetails, useSurveysProgress, useSurveysResponse };
