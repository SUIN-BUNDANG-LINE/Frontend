import Wrapper from '@/components/layout/Wrapper';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header({ username, surveyCount }: { username: string | undefined; surveyCount: number }) {
  return (
    <Wrapper outerColor="#fff">
      <div className={styles.container}>
        <div className={styles.icon}>
          <Image src="/assets/default-user-icon.png" width="96" height="96" alt="" />
        </div>
        <div className={styles.userdata}>
          <div>{username}</div>
          <div>설문 {surveyCount}개 제작</div>
        </div>
      </div>
    </Wrapper>
  );
}
