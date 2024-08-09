'use client';

import styles from './FinishMessage.module.css';

export default function FinishMessage() {
  return (
    <label htmlFor="finishMessage" className={styles.container}>
      <div className={styles.inputDesc}>
        <div>종료 메시지</div>
        <div>설문 참여를 마친 참여자에게 보일 메시지를 입력해주세요.</div>
      </div>
      <input type="text" id="finishMessage" className={styles.input} placeholder="종료 메시지를 입력해주세요." />
    </label>
  );
}
