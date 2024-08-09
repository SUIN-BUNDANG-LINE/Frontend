import Wrapper from '@/components/layout/Wrapper';
import styles from './BasicInfo.module.css';
import CloseDate from './inputs/CloseDate';
import Rewards from './inputs/Rewards';
import ParticipationLimit from './inputs/ParticipationLimit';
import FinishMessage from './inputs/FinishMessage';
import Title from './inputs/Title';

export function BasicInfo() {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.section}>
          <Title />
        </div>
        <div className={styles.section}>
          <FinishMessage />
        </div>
        <div className={styles.section}>
          <CloseDate />
        </div>
        <div className={styles.section}>
          <Rewards />
          <ParticipationLimit />
        </div>
      </div>
    </Wrapper>
  );
}
