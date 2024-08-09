'use client';

import { useAuth } from '@/hooks/useAuth';
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
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        )}
        {user && <User user={user} />}
      </div>
    </div>
  );
}
