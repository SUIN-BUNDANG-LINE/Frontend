import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';
import type { ParticipantList } from './types';

const getParticipants = async (surveyId: string) => {
  const URL = makeUrl(['surveys', 'participants', surveyId]);
  return kyWrapper.get<ParticipantList>(URL);
};

export { getParticipants };
