import Wrapper from '@/components/layout/Wrapper';
import Image from 'next/image';
import styles from './Header.module.css';

export default function OverviewHeader() {
  return (
    <Wrapper outerColor="#fff">
      <div className={styles.container}>
        <div className={styles.icon}>
          <Image src="/assets/dummy-user-icon.png" width="96" height="96" alt="" />
        </div>
        <div className={styles.userdata}>
          <div>Oh youngje님의 대시보드</div>
          <div>설문 1개 제작 • 3개 참여</div>
        </div>
      </div>
    </Wrapper>
  );
}
