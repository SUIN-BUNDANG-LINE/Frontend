import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';
import type { SurveyResult, SurveysResultParams } from './types';

const getResults = async ({ surveyId, resultFilter }: SurveysResultParams) => {
  const URL = makeUrl(['surveys', 'result', surveyId]);
  return kyWrapper.post<SurveyResult>(URL, { json: resultFilter });
};

export { getResults };
