import styles from './index.module.css';

export default function Demo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>🤔 믿기지 않는다면 지금 바로 시험해보세요.</div>
      <form className={styles.form}>
        <textarea className={styles.prompt} placeholder="어떤 내용의 설문지를 만들어 볼까요?" />
      </form>
    </div>
  );
}
