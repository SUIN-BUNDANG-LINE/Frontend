import React from 'react';
import { useSurveyStore } from '../../store';
import RewardType from './type';
import RewardList from './list';
import FinishedAt from './finished-at';
import styles from '../section.module.css';
import MaxParticipants from './max-participants';

export default function RewardSection() {
  const { type, readonly } = useSurveyStore((state) => ({
    readonly: state.status !== 'NOT_STARTED',
    type: state.rewardConfig.type,
  }));

  return (
    <>
      <div className={styles.groupInfo}>
        <h3>리워드</h3>
      </div>

      {readonly && (
        <div className={styles.warning} style={{ marginBottom: '16px' }}>
          공개했던 설문의 리워드는 수정할 수 없습니다.
        </div>
      )}

      <RewardType readonly={readonly} />

      {type !== 'NO_REWARD' && (
        <>
          <RewardList readonly={readonly} />
          <FinishedAt readonly={readonly} />
        </>
      )}

      {type === 'IMMEDIATE_DRAW' && <MaxParticipants readonly={readonly} />}
    </>
  );
}
