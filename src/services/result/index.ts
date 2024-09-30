import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getResults } from '@/services/result/fetch';
import type { ResultFilter } from './types';

const queryKeys = {
  getResults: (surveyId: string, resultFilter: ResultFilter, participantId: string | undefined) => [
    'getResults',
    surveyId,
    resultFilter,
    participantId,
  ],
};

const useSurveyResult = (
  surveyId: string,
  resultFilter: ResultFilter,
  participantId: string | undefined,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: queryKeys.getResults(surveyId, resultFilter, participantId),
    queryFn: () => getResults({ surveyId, resultFilter, participantId }),
    placeholderData: keepPreviousData,
    enabled: options?.enabled,
  });
};

export { useSurveyResult };
