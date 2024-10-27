import { ImportedSurvey } from '@/components/workbench/types';
import { kyWrapper } from '@/services/ky-wrapper';
import { makeUrl } from '@/services/utils';
import { useMutation } from '@tanstack/react-query';

type Args = {
  onSuccess: (data: ImportedSurvey) => void;
  onError: (error: Error) => void;
  visitorId: string | undefined;
};

type Form = {
  target: string;
  groupName: string;
  userPrompt: string;
  fileUrl: string | null;
};

export const useGenerateSurvey = ({ onSuccess, onError, visitorId }: Args) => {
  return useMutation({
    mutationFn: ({ form, signal }: { form: Form; signal: AbortSignal }) => {
      return kyWrapper.post<ImportedSurvey>(makeUrl(['ai', 'generate', 'demo', 'survey', visitorId || 'anonymous']), {
        json: form,
        timeout: 60000,
        signal,
      });
    },
    onSuccess,
    onError,
  });
};
