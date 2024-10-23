import { kyWrapper } from '../ky-wrapper';
import { makeUrlWithUndefined } from '../utils';
import type { SurveyResult, SurveysResultParams } from './types';

const getResults = async ({ surveyId, resultFilter, participantId, visitorId }: SurveysResultParams) => {
  const URL = makeUrlWithUndefined(['surveys', 'management', 'result', surveyId], { participantId, visitorId });
  return kyWrapper.post<SurveyResult>(URL, { json: resultFilter });
};

export { getResults };
