import styles from './Rewards.module.css';

export function Rewards() {
  const rewards = ['치킨', '커피'];

  return (
    <label htmlFor="rewards" className={styles.rewards}>
      <div className={styles.inputDesc}>
        <div>리워드 설정</div>
        <div>지급할 리워드를 입력해주세요.</div>
      </div>
      <div>
        {rewards.map((i) => (
          <span style={{ backgroundColor: 'gray', borderRadius: '12px' }} key={i}>
            {i}
          </span>
        ))}
      </div>
    </label>
  );
}
