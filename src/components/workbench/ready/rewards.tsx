import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { RewardConfig } from '../types';
import styles from './rewards.module.css';

export default function Rewards({ config }: { config: RewardConfig }) {
  const title = ({ NO_REWARD: '리워드 없음', SELF_MANAGEMENT: '직접 지급', IMMEDIATE_DRAW: '즉시 추첨' } as const)[
    config.type
  ];

  const summary = (() => {
    if (config.type === 'NO_REWARD') return '리워드를 지급하지 않습니다.';

    const date = moment(config.finishedAt);
    return `${date.year()}년 ${date.month() + 1}월 ${date.date()}일 ${date.hour()}시가 되면 설문조사를 마감하고 리워드를 지급합니다.`;
  })();

  const list = (() => {
    return (
      <ul className={styles.list}>
        <li key={uuid()} className={`${styles.listHeader} ${styles.listItem}`}>
          <div>수량</div>
          <div>리워드명</div>
        </li>
        {config.rewards.map((reward) => (
          <li key={uuid()} className={styles.listItem}>
            <div>{reward.count}</div>
            <div>{reward.name}</div>
          </li>
        ))}
      </ul>
    );
  })();

  return (
    <div className={styles.rewardsContainer}>
      <div className={styles.title}>
        <strong>리워드 정보 / </strong>
        <span>{title}</span>
      </div>
      <div className={styles.summary}>{summary}</div>

      {config.type !== 'NO_REWARD' && (
        <>
          <div className={styles.about}>
            리워드 당첨자는 {config.type === 'IMMEDIATE_DRAW' ? '설문이용의 추첨을 통해' : '당신이 직접'} 선정합니다.
          </div>
          {list}
          <div className={styles.warning}>⚠ 설문조사를 시작하면 리워드 정보를 변경할 수 없습니다!</div>
        </>
      )}
    </div>
  );
}
