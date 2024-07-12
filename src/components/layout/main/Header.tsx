import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>♡</div>
        <div className={styles.title}>설문이용 헤더</div>
      </div>
    </div>
  );
}
