import styles from './Rewards.module.css';

export default function Rewards() {
  return (
    <div className={styles.container}>
      <div className={styles.inputDesc}>
        <div>리워드 설정</div>
        <div>지급할 리워드를 입력해주세요.</div>
      </div>
      <div className={styles.rewards}>
        <span>A</span>
      </div>
    </div>
  );
}
