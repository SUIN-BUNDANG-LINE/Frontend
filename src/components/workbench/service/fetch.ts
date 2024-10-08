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
  return kyWrapper.get<ImportedSurvey>(makeUrl(['surveys', 'workbench', surveyId]));
};

const fetchSurveyStart = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.patch(makeUrl(['surveys', 'workbench', 'start', surveyId]));
};

const fetchGenerateSurvey = async ({
  method,
  formData,
}: {
  method: 'text-document' | 'file-url';
  formData: { job: string; groupName: string; userPrompt: string; textDocument?: string; fileUrl?: string };
}) => {
  // return new Promise<ImportedSurvey>((resolve) => {
  //   setTimeout(() => {
  //     console.log(method, formData);
  //     resolve(DUMMY);
  //   }, 3000);
  // });
  return kyWrapper.post<ImportedSurvey>(makeUrl(['ai', 'generate', 'survey', method]), {
    json: formData,
    timeout: 60000,
  });
};

export { fetchCreate, fetchGenerateSurvey, fetchSurveyGet, fetchSurveyPut, fetchSurveyStart };
