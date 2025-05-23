import { kyWrapper } from '@/services/ky-wrapper';
import { makeUrl } from '@/services/utils';
import { ImportedSurvey, OutgoingSurvey } from '../types';

const fetchCreate = async () => {
  return kyWrapper.post<{ surveyId: string }>(makeUrl(['surveys', 'workbench', 'create']));
};

const fetchSurveyPut = async ({ surveyId, survey }: { surveyId: string; survey: OutgoingSurvey }) => {
  return kyWrapper.put(makeUrl(['surveys', 'workbench', surveyId]), { json: survey });
};

const fetchSurveyGet = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.get<ImportedSurvey>(makeUrl(['surveys', 'make-info', surveyId]));
};

const fetchSurveyStart = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.patch(makeUrl(['surveys', 'workbench', 'start', surveyId]));
};

const fetchGenerateSurvey = async ({
  formData,
  surveyId,
  signal,
}: {
  formData: { target: string; groupName: string; userPrompt: string; fileUrl: string | null };
  surveyId: string;
  signal: AbortSignal;
}) => {
  return kyWrapper.post<ImportedSurvey>(makeUrl(['ai', 'generate', 'survey', surveyId]), {
    json: formData,
    timeout: 60000,
    signal,
  });
};

export { fetchCreate, fetchGenerateSurvey, fetchSurveyGet, fetchSurveyPut, fetchSurveyStart };
