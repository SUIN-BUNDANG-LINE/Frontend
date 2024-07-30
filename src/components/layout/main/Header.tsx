'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import styles from './Header.module.css';
import User from './user/User';

export default function Header() {
  const { user } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.title}>sulmun.io</div>
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
