import { Store } from '@/components/workbench/types';
import { FaCalendarAlt, FaGift } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import styles from './Rewards.module.css';

export default function Rewards({ rewardConfig }: { rewardConfig: Store['rewardConfig'] }) {
  const { type } = rewardConfig;
  // const { type, finishedAt, targetParticipantCount, rewards } = rewardConfig;

  if (type === 'NO_REWARD') {
    return <div className={styles.noReward}>리워드를 지급하지 않습니다.</div>;
  }

  const timeLeft = moment().diff(moment(rewardConfig.finishedAt));

  return (
    <>
      <div>
        <FaCalendarAlt />
        <div>{timeLeft}</div>
      </div>
      {rewardConfig.targetParticipantCount != null && (
        <div>
          <FaUserGroup />
          <div className={styles.participants}>
            <div>{0}명 응답 완료</div>
            <div>/ 최대 {rewardConfig.targetParticipantCount}명 응답 가능</div>
          </div>
        </div>
      )}
      {rewardConfig.rewards.length > 0 && (
        <div>
          <FaGift />
          <div className={styles.rewards}>
            {rewardConfig.rewards.map((reward) => (
              <div className={styles.reward} key={uuid()}>
                <div className={styles.item}>{reward.name}</div>
                <div className={styles.count}>x {reward.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ul className={styles.clause}>
        <li>* 설문 조사자가 지급을 약속한 리워드와 수량입니다.</li>
        <li>* 리워드는 추첨을 퉁해 지급되며, 낙첨된 경우 지급되지 않습니다.</li>
      </ul>
    </>
  );
}
