import type { Store, Actions } from '../types';

export * from './convert';
export * from './validate';

export const extractStore = (state: Store & Actions) => ({
  title: state.title,
  description: state.description,
  thumbnail: state.thumbnail,
  publishedAt: state.publishedAt,
  finishMessage: state.finishMessage,
  status: state.status,
  isVisible: state.isVisible,
  rewardConfig: state.rewardConfig,
  sections: state.sections,
  fields: state.fields,
});
