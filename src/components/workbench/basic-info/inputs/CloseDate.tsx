/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useMemo, useRef, useState } from 'react';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useDropdown } from '@/hooks/useDropdown';
import styles from './CloseDate.module.css';

export default function CloseDate() {
  const dateRef = useRef<HTMLInputElement>(null);
  const [afternoon, setAfternoon] = useState(false);
  const [hour, setHour] = useState(12);
  const { isOpen, fn, dropdownRef } = useDropdown();

  const fixedContent = useMemo(
    () => (
      <button type="button" className={styles.hourBtn}>
        {hour}시
      </button>
    ),
    [hour]
  );

  const toggleContent = (
    <div className={styles.hourBtns}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <button
          type="button"
          key={i}
          className={styles.hourBtn}
          onClick={() => setHour(i)}
          onKeyDown={() => setHour(i)}>
          {i}시
        </button>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <label htmlFor="closeDate" className={styles.inputDesc}>
        <div>마감 일정</div>
        <div>설정한 시각에 설문조사가 자동으로 닫힙니다.</div>
      </label>
      <div className={styles.inputs}>
        <input
          ref={dateRef}
          id="closeDate"
          type="date"
          placeholder="날짜 선택"
          onKeyDown={() => dateRef.current?.showPicker()}
          onClick={() => dateRef.current?.showPicker()}
          className={styles.date}
        />
        <button type="button" className={styles.afternoon} onClick={() => setAfternoon((p) => !p)}>
          {afternoon ? '오후' : '오전'}
        </button>
        <Dropdown
          fixedContent={fixedContent}
          toggleContent={toggleContent}
          dropdownRef={dropdownRef}
          isOpen={isOpen}
          fn={fn}
          style={{ right: 0 }}
        />
      </div>
    </div>
  );
}
