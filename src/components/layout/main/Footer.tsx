import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        powered by <Link href="/">설문이용</Link>
      </div>
    </div>
  );
}
