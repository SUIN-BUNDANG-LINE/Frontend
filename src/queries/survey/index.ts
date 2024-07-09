import { useQuery } from '@tanstack/react-query';
import { getSurveyDetails } from '../DUMMY_API';

const queryKeys = {
  root: ['survey'],
  details: (surveyId: string) => [...queryKeys.root, 'details', surveyId],
};

function useSurveyDetails(surveyId: string) {
  return useQuery({
    queryKey: queryKeys.details(surveyId),
    queryFn: () => getSurveyDetails(surveyId),
    select: ({ data }) => data,
  });
}

export { useSurveyDetails };
