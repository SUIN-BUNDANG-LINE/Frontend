import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';
import type { Results, SurveysResultParams } from './types';

const getResults = async ({ surveyId, resultFilter }: SurveysResultParams) => {
  const URL = makeUrl(['surveys', 'result', surveyId]);
  return kyWrapper.post<Results>(URL, { json: resultFilter });
};

export { getResults };
