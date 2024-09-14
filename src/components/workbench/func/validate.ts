import { Store } from '../types';

export const validate = (store?: Store) => {
  return !!store;
};
