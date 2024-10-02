import type { CheckboxField, RadioField, TextField } from '@/components/workbench/types';
import type { Response } from './core';

export type Dispatch = {
  set: ({ fieldId, content, other }: { fieldId: string; content: string; other: boolean }) => void;
  clear: ({ fieldId, content, other }: { fieldId: string; content: string; other: boolean }) => void;
};

export type TextFieldProps = {
  field: TextField;
  response?: Response;
  dispatch: Dispatch;
};

export type RadioFieldProps = {
  field: RadioField;
  response?: Response;
  dispatch: Dispatch;
};

export type CheckboxFieldProps = {
  field: CheckboxField;
  responses: Response[];
  dispatch: Dispatch;
};
