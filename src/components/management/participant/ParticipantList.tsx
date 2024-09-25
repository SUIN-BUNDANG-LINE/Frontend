import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { ParticipantInfo } from '@/services/participant/types';
import { FaEye } from 'react-icons/fa';
import styles from './ParticipantList.module.css';

interface ParticipantListProps {
  participants: ParticipantInfo[];
}

export default function ParticipantList({ participants }: ParticipantListProps) {
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
                <Link href={`/participant/${participant.participantId}`} className={styles.viewButton}>
                  <FaEye />
                  <span>응답 보기</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
