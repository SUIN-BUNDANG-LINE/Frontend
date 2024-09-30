import { kyWrapper } from '../ky-wrapper';
import { makeUrlWithUndefined } from '../utils';
import type { SurveyResult, SurveysResultParams } from './types';

const getResults = async ({ surveyId, resultFilter, participantId }: SurveysResultParams) => {
  const URL = makeUrlWithUndefined(['surveys', 'result', surveyId], { participantId });
  return kyWrapper.post<SurveyResult>(URL, { json: resultFilter });
};

export { getResults };
