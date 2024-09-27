/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { RadioFieldProps } from '../../types/participate';
import styles from './RadioField.module.css';

export default function RadioField({ field, response, dispatch }: RadioFieldProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [otherValue, setOtherValue] = React.useState('');

  const Other = (() => {
    const active = response && response.other;
    const markerClasses = [styles.marker];
    if (active) markerClasses.push(styles.active);

    const clickHandler = () => {
      if (active) dispatch.clear({ fieldId: field.fieldId, content: otherValue, other: true });
      else {
        dispatch.set({ fieldId: field.fieldId, content: otherValue, other: true });
        ref.current?.focus();
      }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setOtherValue(e.target.value);
      dispatch.set({ fieldId: field.fieldId, content: e.target.value, other: true });
    };

    return (
      <div role="button" tabIndex={0} aria-label="기타 응답" className={styles.line} onClick={clickHandler}>
        <div className={styles.option}>
          <div>
            <div className={markerClasses.join(' ')} />
          </div>
          <input
            value={otherValue}
            onClick={(e) => {
              if (active) e.stopPropagation();
            }}
            onChange={changeHandler}
            className={styles.input}
            type="text"
            placeholder="기타 응답..."
            ref={ref}
          />
        </div>
      </div>
    );
  })();

  return (
    <div className={styles.radioField}>
      {field.options.map((option) => {
        const active = response && !response.other && response.content === option.content;
        const markerClasses = [styles.marker];
        if (active) markerClasses.push(styles.active);

        const changeHandler = () => {
          if (active) dispatch.clear({ fieldId: field.fieldId, content: option.content, other: false });
          else dispatch.set({ fieldId: field.fieldId, content: option.content, other: false });
        };

        return (
          <div
            key={option.id}
            role="button"
            tabIndex={0}
            aria-label={option.content}
            className={styles.line}
            onClick={changeHandler}
            onKeyDown={changeHandler}>
            <div className={styles.option}>
              <div>
                <div className={markerClasses.join(' ')} />
              </div>
              <div>{option.content || '빈 선택지'}</div>
            </div>
          </div>
        );
      })}
      {field.other && Other}
    </div>
  );
}
