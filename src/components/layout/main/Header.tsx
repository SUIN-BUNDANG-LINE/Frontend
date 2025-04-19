'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import User from './user/User';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useAuth();

  const Login = (
    <Link href="/login" className={styles.login}>
      설문조사 시작하기
    </Link>
  );

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.title}>설문이용</div>
        </Link>
        {!user && Login}
        {user && (
          <div className={styles.userMenu}>
            <Link href="/mypage" className={styles.myPage}>
              <FaExternalLinkAlt className={styles.myPageIcon} /> {' 마이페이지'}
            </Link>
            <User user={user} />
          </div>
        )}
      </div>
    </div>
  );
}
