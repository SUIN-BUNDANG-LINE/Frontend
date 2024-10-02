import type { Field as FieldType } from '@/components/workbench/types';
import type { Dispatch } from '../../types/participate';
import styles from './Field.module.css';
import TextField from './TextField';
import { Response } from '../../types/core';
import RadioField from './RadioField';
import CheckboxField from './CheckboxField';

type Props = {
  field: FieldType;
  responses: Response[];
  dispatch: Dispatch;
  valid: boolean;
};

export default function Field({ field, responses, dispatch, valid }: Props) {
  const { title, description, required } = field;

  const response = responses.find((i) => i.fieldId === field.fieldId);

  const requiredTagClasses = [styles.requiredTag];
  if (valid) requiredTagClasses.push(styles.valid);

  return (
    <div className={styles.field} id={field.fieldId}>
      <div className={styles.heads}>
        <div className={styles.title}>
          {required && <span className={requiredTagClasses.join(' ')}>필수</span>}
          {title || '제목 없는 질문'}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.body}>
        {field.type === 'text' && <TextField field={field} response={response} dispatch={dispatch} />}
        {field.type === 'radio' && <RadioField field={field} response={response} dispatch={dispatch} />}
        {field.type === 'checkbox' && (
          <CheckboxField
            field={field}
            responses={responses.filter((i) => i.fieldId === field.fieldId)}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  );
}
