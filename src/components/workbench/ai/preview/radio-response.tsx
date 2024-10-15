/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import styles from './radio-response.module.css';

type Props = {
  options: { id: string; content: string }[];
  other: boolean;
};

export default function RadioResponse({ options, other }: Props) {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div key={option.id} className={styles.line}>
          <div className={styles.option}>
            <div className={styles.marker} />
            <div>{option.content || '빈 선택지'}</div>
          </div>
        </div>
      ))}
      {other && (
        <div className={styles.line}>
          <div className={styles.option}>
            <div className={styles.marker} />
            <div className={styles.input}>기타...</div>
          </div>
        </div>
      )}
    </div>
  );
}
