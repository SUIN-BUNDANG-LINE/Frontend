import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getParticipants } from '@/services/participant/fetch';

const queryKeys = {
  participants: (surveyId: string, visitorId: string | undefined) => ['participants', surveyId, visitorId],
};

const useParticipants = (surveyId: string, visitorId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.participants(surveyId, visitorId),
    queryFn: () => getParticipants(surveyId, visitorId),
    placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: Infinity,
  });
};

export { useParticipants };
