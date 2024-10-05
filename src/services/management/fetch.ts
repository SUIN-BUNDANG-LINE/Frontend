import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';

interface EmptyResponse {}

const fetchSurveyEdit = async ({ surveyId }: { surveyId: string }) => {
  const URL = makeUrl(['surveys', 'workbench', 'edit', surveyId]);
  return kyWrapper.patch<EmptyResponse>(URL);
};

const fetchSurveyFinish = async ({ surveyId }: { surveyId: string }) => {
  const URL = makeUrl(['surveys', 'workbench', 'finish', surveyId]);
  return kyWrapper.patch<EmptyResponse>(URL);
};

const fetchSurveyDelete = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.delete(makeUrl(['surveys', 'workbench', 'delete', surveyId]));
};

export { fetchSurveyEdit, fetchSurveyFinish, fetchSurveyDelete };
