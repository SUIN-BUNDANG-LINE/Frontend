import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getResults } from '@/services/result/fetch';
import type { ResultFilter } from './types';

const queryKeys = {
  getResults: (surveyId: string, resultFilter: ResultFilter) => ['getResults', surveyId, resultFilter],
};

const useSurveyResult = (surveyId: string, resultFilter: ResultFilter) => {
  return useQuery({
    queryKey: queryKeys.getResults(surveyId, resultFilter),
    queryFn: () => getResults({ surveyId, resultFilter }),
    placeholderData: keepPreviousData,
  });
};

export { useSurveyResult };
