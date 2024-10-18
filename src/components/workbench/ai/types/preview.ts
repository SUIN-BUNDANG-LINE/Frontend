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

// compare

export type CQuestion = {
  questionId: string;
  changeType: ChangeType;
  old: null | F;
  new: null | F;
};

export type CSection = {
  sectionId: string;
  changeType: ChangeType;
  old: null | { title: string; description: string };
  new: null | { title: string; description: string };
  questions: CQuestion[];
};

export type CSurvey = {
  surveyId: string;
  changeType: ChangeType;
  old: null | { title: string; description: string; finishMessage: string };
  new: null | { title: string; description: string; finishMessage: string };
  sections: CSection[];
};
