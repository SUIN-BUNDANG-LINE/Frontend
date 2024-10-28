import { kyWrapper } from '../ky-wrapper';
import { makeUrlWithUndefined } from '../utils';
import type { SurveyResult, SurveysResultParams, SurveyRawResult } from './types';

const getResults = async ({ surveyId, resultFilter, participantId, visitorId }: SurveysResultParams) => {
  const URL = makeUrlWithUndefined(['surveys', 'management', 'result', surveyId], { participantId, visitorId });
  return kyWrapper.post<SurveyResult>(URL, { json: resultFilter });
};

const getRawResults = async ({ surveyId, visitorId }: { surveyId: string; visitorId: string | undefined }) => {
  const URL = makeUrlWithUndefined(['surveys', 'management', 'raw-result', surveyId], { visitorId });
  return kyWrapper.get<SurveyRawResult>(URL);
};

export { getResults, getRawResults };
