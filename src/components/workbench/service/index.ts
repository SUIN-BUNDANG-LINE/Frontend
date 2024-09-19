import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSurvey } from './fetch';
import { OutgoingSurvey } from '../types';

const queryKeys = {
  root: ['workbench'],
  survey: (surveyId: string) => [...queryKeys.root, surveyId],
};

const useGetSurvey = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.survey(surveyId),
    queryFn: () => fetchSurvey({ surveyId, method: 'GET' }),
  });
};

const usePutSurvey = (surveyId: string, onSuccess: () => void, onError: () => void) => {
  return useMutation({
    mutationFn: (survey: OutgoingSurvey) => fetchSurvey({ surveyId, method: 'PUT', survey }),
    onSuccess,
    onError,
  });
};

export { useGetSurvey, usePutSurvey };
