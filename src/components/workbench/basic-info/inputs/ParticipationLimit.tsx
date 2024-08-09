'use client';

import { useState } from 'react';
import styles from './ParticipantionLimit.module.css';

export default function ParticipantionLimit() {
  const [val, setVal] = useState('0');
  const [focus, setFocus] = useState(false);

  function sanitize(p: string) {
    const res = p.replace(/\D/g, '').replace(/^0+/, '');
    return res.length === 0 ? '0' : res;
  }

  return (
    <label htmlFor="participationLimit" className={styles.container}>
      <div className={styles.inputDesc}>
        <div>참여 인원</div>
        <div>리워드 추첨에 참여할 최대 인원입니다.</div>
      </div>
      <input
        type="text"
        id="participationLimit"
        className={styles.input}
        value={focus ? val : `${val} 명`}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          setVal(sanitize(e.target.value));
          setFocus(false);
        }}
      />
    </label>
  );
}
