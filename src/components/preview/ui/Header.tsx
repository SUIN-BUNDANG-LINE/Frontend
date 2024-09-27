import styles from './Header.module.css';

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>♡</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
}
