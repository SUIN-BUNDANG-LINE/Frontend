import { kyWrapper } from '@/services/ky-wrapper';
import { makeUrl } from '@/services/utils';
import { SurveyResponse } from './types';

const fetchCreate = async () => {
  return kyWrapper.post<{ surveyId: string }>(makeUrl(['surveys', 'workbench', 'create']));
};

const fetchSurvey = async (surveyId: string) => {
  return kyWrapper.get<SurveyResponse>(makeUrl(['surveys', 'workbench', surveyId]));
};

export { fetchCreate, fetchSurvey };
