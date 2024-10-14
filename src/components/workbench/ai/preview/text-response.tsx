import styles from './text-response.module.css';

export default function TextResponse() {
  return (
    <div className={styles.line}>
      <div className={styles.input}>답변을 입력해주세요.</div>
    </div>
  );
}
