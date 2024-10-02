export * from './shared';
export * from './query';
export * from './store';

export type ErrorDescriptor = {
  location?: string[];
  reason: string;
};
