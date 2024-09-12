import { useQuery } from '@tanstack/react-query';
import { fetchSurvey } from './fetch';

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

export { useWorkbenchSurvey };
