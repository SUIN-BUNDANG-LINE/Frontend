import React from 'react';
import moment from 'moment';
import { ParticipantInfo } from '@/services/participant/types';
import { FaEye } from 'react-icons/fa';
import { replaceURLSearchParams } from '@/utils/url-search-params';
import styles from './ParticipantList.module.css';

interface ParticipantListProps {
  participants: ParticipantInfo[];
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function ParticipantList({ participants, setTab }: ParticipantListProps) {
  const handleLinkClick = (participantId: string) => {
    replaceURLSearchParams('tab', 2);
    replaceURLSearchParams('participantId', participantId);
    setTab(2);
  };

  return (
    <div className={styles.participantList}>
      <h2 className={styles.title}>참가자 목록</h2>
      <table className={styles.participantTable}>
        <thead>
          <tr>
            <th>응답 일시</th>
            <th>응답 보기</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.participantId}>
              <td>{moment(participant.participatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td className={styles.viewButtonCell}>
                <button
                  type="button"
                  onClick={() => handleLinkClick(participant.participantId)}
                  className={styles.viewButton}>
                  <FaEye />
                  <span>응답 보기</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
