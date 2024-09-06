import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';
import type { Results } from './types';

const getResults = async ({ surveyId }: { surveyId: string }) => {
  const URL = makeUrl(['surveys', 'result', surveyId]);
  return kyWrapper.get<Results>(URL);
};

export { getResults };
