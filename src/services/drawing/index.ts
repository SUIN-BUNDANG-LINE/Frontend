import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchDrawingDraw, fetchDrawingInfo } from './fetch';

const queryKeys = {
  root: ['drawing'],
  info: (surveyId: string) => [...queryKeys.root, 'info', surveyId],
  draw: (surveyId: string) => [...queryKeys.root, 'draw', surveyId],
};

const useDrawingInfo = (surveyId: string) => {
  return useQuery({
    queryKey: queryKeys.info(surveyId),
    queryFn: () => fetchDrawingInfo(surveyId),
  });
};

const useDrawingDraw = (participantId: string) => {
  return useMutation({
    mutationFn: ({ phoneNumber, selectedNumber }: { phoneNumber: string; selectedNumber: number }) =>
      fetchDrawingDraw({ participantId, phoneNumber, selectedNumber }),
  });
};

export { useDrawingInfo, useDrawingDraw };
