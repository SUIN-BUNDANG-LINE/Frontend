import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchSurvey, fetchCreate } from './fetch';

const queryKeys = {
  root: ['workbench'],
  survey: (surveyId: string) => [...queryKeys.root, surveyId],
};

const useWorkbenchSurvey = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.survey(surveyId),
    queryFn: () => fetchSurvey(surveyId),
  });
};

const useCreateSurvey = () => {
  return useMutation({
    mutationFn: () => fetchCreate(),
  });
};

export { useWorkbenchSurvey, useCreateSurvey };
