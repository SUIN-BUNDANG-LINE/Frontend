import { kyWrapper } from '../ky-wrapper';
import { makeUrlWithUndefined } from '../utils';
import type { ParticipantList } from './types';

const getParticipants = async (surveyId: string, visitorId: string | undefined) => {
  const URL = makeUrlWithUndefined(['surveys', 'management', 'participants', surveyId], { visitorId });
  return kyWrapper.get<ParticipantList>(URL);
};

export { getParticipants };
