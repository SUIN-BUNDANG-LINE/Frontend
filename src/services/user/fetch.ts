import KyWrapper from '../ky-wrapper';
import { makeUrl } from '../utils';
import type { User } from './types';

const kyWrapper = new KyWrapper();

const fetchUserProfile = async () => {
  try {
    return await kyWrapper.get<User>(makeUrl(['user', 'profile']));
  } catch (e) {
    return null;
  }
};

export { fetchUserProfile };
