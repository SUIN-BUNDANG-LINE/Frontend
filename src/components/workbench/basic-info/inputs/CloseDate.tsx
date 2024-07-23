import { useRef } from 'react';
import styles from './CloseDate.module.css';

export function CloseDate() {
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <label htmlFor="closeDate" className={styles.closeDate}>
      <div className={styles.inputDesc}>
        <div>마감 일정</div>
        <div>설정한 시각에 설문조사가 자동으로 닫힙니다.</div>
      </div>
      <input
        ref={dateRef}
        id="closeDate"
        type="datetime-local"
        placeholder="날짜 선택"
        onKeyDown={() => dateRef.current?.showPicker()}
        onClick={() => dateRef.current?.showPicker()}
      />
    </label>
  );
}
