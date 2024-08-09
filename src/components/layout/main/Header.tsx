'use client';

import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/utils/toast';
import Link from 'next/link';
import User from './user/User';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.title}>설문이용</div>
        </Link>
        {!user && (
          <button
            type="button"
            className={styles.login}
            onClick={() => showToast('info', <div>준비 중인 기능입니다.</div>)}>
            로그인
          </button>
          // <Link href="/login" className={styles.login}>
          //   로그인
          // </Link>
        )}
        {user && <User user={user} />}
      </div>
    </div>
  );
}
