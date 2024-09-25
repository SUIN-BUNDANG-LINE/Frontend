import { FaClipboardCheck, FaTrophy } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import styles from './ParticipantSummary.module.css';

interface ParticipantSummaryProps {
  responseCount: number;
  drawCount: number | null;
  targetParticipant: number | null;
  winningCount: number | null;
}

export default function ParticipantSummary({
  responseCount,
  drawCount,
  targetParticipant,
  winningCount,
}: ParticipantSummaryProps) {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.title}>참가 현황</h2>
      <div className={styles.infoWithIcons}>
        <div className={styles.infoWithIcon}>
          <FaClipboardCheck />
          <div>{responseCount}명 응답 완료</div>
        </div>
        {drawCount && targetParticipant && winningCount ? (
          <>
            <div className={styles.infoWithIcon}>
              <FaUserGroup />
              <div>
                {drawCount}명 추첨 완료 / 최대 {targetParticipant}명 추첨 가능
              </div>
            </div>
            <div className={styles.infoWithIcon}>
              <FaTrophy />
              <div>{winningCount}명 당첨</div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
