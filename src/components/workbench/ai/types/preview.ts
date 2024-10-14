import { Section as S, Field as F, RouteStrategy } from '../../types';

export type ChangeType = 'UNCHANGED' | 'MODIFIED' | 'DELETED' | 'CREATED';

export type Survey = {
  surveyId: string;
  title: string;
  description: string;
  finishMessage: string;
};

export type Section = Omit<S, 'routeStrategy'> & {
  routeStrategy?: RouteStrategy;
};

export type Field = F;
