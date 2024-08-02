import Wrapper from '@/components/layout/Wrapper';
import styles from './BasicInfo.module.css';
import { CloseDate } from './inputs/CloseDate';
import { Rewards } from './inputs/Rewards';

export function BasicInfo() {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.section}>
          <input className={styles.surveyTitle} type="text" placeholder="설문지 제목" />
          <input className={styles.surveyDescription} type="text" placeholder="설문지 설명" />
        </div>
        <div className={styles.section}>
          <CloseDate />
          <Rewards />
        </div>
      </div>
    </Wrapper>
  );
}
