import moment from 'moment';
import { ParticipantInfo } from '@/services/participant/types';
import styles from './WinnerList.module.css';

interface WinnerListProps {
  winners: ParticipantInfo[];
}

export default function WinnerList({ winners }: WinnerListProps) {
  return (
    <div className={styles.winnerList}>
      <h2 className={styles.title}>당첨자 목록</h2>
      <table className={styles.winnerTable}>
        <thead>
          <tr>
            <th>응답 일시</th>
            <th>리워드 이름</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner) => (
            <tr key={winner.participantId}>
              <td>{moment(winner.participatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{winner.drawInfo?.reward}</td>
              <td>{winner.drawInfo?.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
