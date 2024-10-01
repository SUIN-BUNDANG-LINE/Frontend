import React from 'react';
import moment from 'moment';
import { useSurveyStore } from '../../store';
import styles from './type.module.css';

type Props = {
  readonly: boolean;
};

export default function RewardType({ readonly }: Props) {
  const { type, finishedAt, setter } = useSurveyStore((state) => ({
    type: state.rewardConfig.type,
    finishedAt: state.rewardConfig.finishedAt,
    setter: state.rewardSetter,
  }));

  const typeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // toISOString returns a timestamp in UTC
      const newFinishedAt = finishedAt || moment().add(7, 'day').startOf('day').toISOString();

      switch (e.target.value) {
        case 'IMMEDIATE_DRAW': {
          setter({
            updates: {
              type: 'IMMEDIATE_DRAW',
              finishedAt: newFinishedAt,
              targetParticipantCount: 0,
            },
          });
          return;
        }
        case 'SELF_MANAGEMENT': {
          setter({
            updates: {
              type: 'SELF_MANAGEMENT',
              finishedAt: newFinishedAt,
              targetParticipantCount: null,
            },
          });
          return;
        }
        case 'NO_REWARD':
        default: {
          setter({
            updates: {
              type: 'NO_REWARD',
              finishedAt: null,
              targetParticipantCount: null,
            },
          });
        }
      }
    },
    [setter, finishedAt]
  );

  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor="reward-type">
        <span>지급 방식</span>
        <select id="reward-type" className={styles.select} value={type} onChange={typeHandler} disabled={readonly}>
          <option value="NO_REWARD">리워드 없음</option>
          <option value="SELF_MANAGEMENT">리워드 직접 지급</option>
          <option value="IMMEDIATE_DRAW">즉시 추첨 뽑기</option>
        </select>
      </label>
    </div>
  );
}
