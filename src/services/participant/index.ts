import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getParticipants } from '@/services/participant/fetch';

const queryKeys = {
  participants: (surveyId: string) => ['participants', surveyId],
};

const useParticipants = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.participants(surveyId),
    queryFn: () => getParticipants(surveyId),
    placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: Infinity,
  });
};

export { useParticipants };
