import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import moment from 'moment';
import { ParticipantInfo } from '@/services/participant/types';
import styles from './WinnerList.module.css';

interface WinnerListProps {
  winners: ParticipantInfo[];
}

export default function WinnerList({ winners }: WinnerListProps) {
  const [visiblePhoneNumbers, setVisiblePhoneNumbers] = useState<{ [key: string]: boolean }>({});

  const maskPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) return '***-****-****';
    return phoneNumber.replace(/(\d{3})[-]?(\d{4})[-]?(\d{4})/, '$1-****-$3');
  };

  const togglePhoneNumberVisibility = (participantId: string) => {
    setVisiblePhoneNumbers((prevState) => ({
      ...prevState,
      [participantId]: !prevState[participantId],
    }));
  };

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
          {winners.map((winner) => {
            const isPhoneNumberVisible = visiblePhoneNumbers[winner.participantId] || false;

            const phoneNumber = winner.drawInfo?.phoneNumber || '';

            return (
              <tr key={winner.participantId}>
                <td>{moment(winner.participatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{winner.drawInfo?.reward || 'N/A'}</td>
                <td className={styles.phoneNumberCell}>
                  {isPhoneNumberVisible ? phoneNumber : maskPhoneNumber(phoneNumber)}
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => togglePhoneNumberVisibility(winner.participantId)}
                    aria-label="전화번호 보기">
                    {isPhoneNumberVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
