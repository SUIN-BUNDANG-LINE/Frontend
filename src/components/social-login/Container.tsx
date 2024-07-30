'use client';

import styles from './Container.module.css';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
      <br />
      <div className={styles.description}>
        소셜 로그인으로 <a href="/">sulmun.io</a>의 모든 기능을 이용할 수 있습니다.
      </div>
    </div>
  );
}
