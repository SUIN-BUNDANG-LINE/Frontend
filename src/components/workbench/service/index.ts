import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSurveyGet, fetchSurveyPut, fetchCreate, fetchSurveyStart, fetchGenerateSurvey } from './fetch';
import { ImportedSurvey, OutgoingSurvey } from '../types';

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

const usePutSurvey = (surveyId: string, onSuccess: () => void, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: (survey: OutgoingSurvey) => fetchSurveyPut({ surveyId, survey }),
    onSuccess,
    onError,
  });
};

const useCreateSurvey = () => {
  return useMutation({
    mutationFn: fetchCreate,
  });
};

const useStartSurvey = (surveyId: string, onSuccess: () => void, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: () => fetchSurveyStart({ surveyId }),
    onSuccess,
    onError,
  });
};

const useGenerateSurvey = ({
  onSuccess,
  onError,
  surveyId,
}: {
  onSuccess: (data: ImportedSurvey) => void;
  onError: (error: Error) => void;
  surveyId: string;
}) => {
  return useMutation({
    mutationKey: ['ai', 'generate', 'survey', surveyId],
    mutationFn: ({
      method,
      formData,
    }: {
      method: 'text-document' | 'file-url';
      formData: { target: string; groupName: string; userPrompt: string; textDocument?: string; fileUrl?: string };
    }) => fetchGenerateSurvey({ method, formData, surveyId }),
    onSuccess,
    onError,
  });
};

export { useGetSurvey, usePutSurvey, useCreateSurvey, useStartSurvey, useGenerateSurvey };
