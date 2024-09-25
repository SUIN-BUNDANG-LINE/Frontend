import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSurveyGet, fetchSurveyPut, fetchCreate } from './fetch';
import { OutgoingSurvey } from '../types';

const queryKeys = {
  root: ['workbench'],
  survey: (surveyId: string) => [...queryKeys.root, surveyId],
};

const useGetSurvey = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.survey(surveyId),
    queryFn: () => fetchSurveyGet({ surveyId }),
    staleTime: 0,
    gcTime: 0,
  });
};

const usePutSurvey = (surveyId: string, onSuccess: () => void, onError: () => void) => {
  return useMutation({
    mutationFn: (survey: OutgoingSurvey) => fetchSurveyPut({ surveyId, survey }),
    onSuccess,
    onError,
  });
};

const useCreateSurvey = () => {
  return useMutation({
    mutationFn: () => fetchCreate(),
  });
};

export { useGetSurvey, usePutSurvey, useCreateSurvey };
