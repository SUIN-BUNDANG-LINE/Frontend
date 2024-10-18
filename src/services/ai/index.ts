import { useMutation } from '@tanstack/react-query';
import type { Response, Request } from '@/components/workbench/ai/types/chat';
import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';

export const useChat = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: Response) => unknown;
  onError: (error: Error) => unknown;
}) => {
  return useMutation({
    mutationFn: async (request: Request) =>
      kyWrapper.post<Response>(makeUrl(['ai', 'chat', 'edit', 'survey-data']), { json: request, timeout: 60000 }),
    onSuccess,
    onError,
  });
};
