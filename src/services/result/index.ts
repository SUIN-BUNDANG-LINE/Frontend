import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getResults } from '@/services/result/fetch';
import type { ResultFilter } from './types';

const queryKeys = {
  getResults: (
    surveyId: string,
    resultFilter: ResultFilter,
    participantId: string | undefined,
    visitorId: string | undefined
  ) => ['getResults', surveyId, resultFilter, participantId, visitorId],
};

const useSurveyResult = (
  surveyId: string,
  resultFilter: ResultFilter,
  participantId: string | undefined,
  visitorId: string | undefined,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: queryKeys.getResults(surveyId, resultFilter, participantId, visitorId),
    queryFn: () => getResults({ surveyId, resultFilter, participantId, visitorId }),
    placeholderData: keepPreviousData,
    enabled: options?.enabled,
  });
};

export { useSurveyResult };
