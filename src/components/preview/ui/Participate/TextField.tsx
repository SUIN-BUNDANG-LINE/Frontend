import React from 'react';
import { TextFieldProps } from '../../types/participate';
import styles from './TextField.module.css';

export default function TextField({ field, response, dispatch }: TextFieldProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const value = response?.content || '';

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.set({ fieldId: field.fieldId, content: e.target.value, other: false });
  };

  return (
    <div className={styles.textField}>
      <div
        role="button"
        tabIndex={0}
        aria-label="input"
        className={styles.line}
        onClick={() => ref.current?.focus()}
        onKeyDown={() => ref.current?.focus()}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={changeHandler}
          ref={ref}
          placeholder="답변을 입력해주세요."
        />
      </div>
    </div>
  );
}
