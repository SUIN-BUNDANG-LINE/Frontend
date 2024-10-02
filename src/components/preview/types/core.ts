import type { Field, Section } from '../../workbench/types';

export type State = 'surveyDetails' | 'participate' | 'readyToSubmit';

export type Progress = {
  stack: Section[];
  page: Field[];
};

export type Response = {
  fieldId: string;
  content: string;
  other: boolean;
};
