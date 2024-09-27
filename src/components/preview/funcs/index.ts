import { Field } from '@/components/workbench/types';
import { Response } from '../types/core';

export const validateResponse = ({
  field,
  response,
  responses,
}: {
  field: Field;
  response?: Response;
  responses?: Response[];
}) => {
  if (!field.required) return true;

  switch (field.type) {
    case 'text':
      return !!response && response.content.trim() !== '';
    case 'radio':
      return !!response && (!response.other || response.content.trim() !== '');
    case 'checkbox':
      return !!responses && responses.some((i) => !i.other || i.content.trim() !== '');
    default:
      return false;
  }
};
