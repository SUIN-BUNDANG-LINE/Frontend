import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSurveyGet, fetchSurveyPut } from './fetch';
import { OutgoingSurvey } from '../types';

const queryKeys = {
  root: ['workbench'],
  survey: (surveyId: string) => [...queryKeys.root, surveyId],
};

const useGetSurvey = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.survey(surveyId),
    queryFn: () => fetchSurveyGet({ surveyId }),
  });
};

const usePutSurvey = (surveyId: string, onSuccess: () => void, onError: () => void) => {
  return useMutation({
    mutationFn: (survey: OutgoingSurvey) => fetchSurveyPut({ surveyId, survey }),
    onSuccess,
    onError,
  });
};

export { useGetSurvey, usePutSurvey };
