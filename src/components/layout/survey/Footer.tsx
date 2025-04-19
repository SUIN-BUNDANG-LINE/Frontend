/* eslint-disable no-irregular-whitespace */
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        {/* 브랜드 / 서비스명 */}
        <h2 className={styles.brand}>
          <Link href="/">설문이용</Link>
        </h2>

        <nav className={styles.policy}>
          <Link href="mailto:sulmoon.io@gmail.com">제휴 및 파트너십 문의&nbsp;sulmoon.io@gmail.com</Link>
          <span className={styles.delimiter}>|</span>
          <Link href="/s/ba73cc3f-8c54-4fa9-9a31-6d92c27e0c50">문의 및 건의 사항</Link>
        </nav>

        {/* 카피라이트 */}
        <p className={styles.copyright}>© {new Date().getFullYear()} 설문이용. All rights reserved.</p>
      </div>
    </footer>
  );
}
