import styles from './Loading.module.css';

export default function Loading({ message }: { message: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.ellipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <div>{message}</div>
    </div>
  );
}
