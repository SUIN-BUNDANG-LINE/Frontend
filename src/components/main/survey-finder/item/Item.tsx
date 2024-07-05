'use client';

import { dateReader } from '@/utils';
import { FaArrowUp, FaGift } from 'react-icons/fa';
import type { Survey } from '../types';
import styles from './Item.module.css';
import RewardTag from './RewardTag';

function SurveyFinderListItem({ survey }: { survey: Survey }) {
  const { surveyId, thumbnail, title, description, targetParticipants, rewardCount, endDate, rewards } = survey;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={styles.item} onClick={() => alert(surveyId)}>
      <div
        className={styles.thumbnail}
        style={{ backgroundColor: 'var(--gray-ml)', backgroundSize: 'cover', backgroundImage: `url("${thumbnail}")` }}
      />
      <div className={styles.info}>
        <div>
          <div className={styles.title}>{title.length < 28 ? title : `${title.substring(0, 25).trim()}...`}</div>
          <div className={styles.time}>{dateReader(endDate)}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.rewards}>
            {rewards.map((i) => (
              <RewardTag reward={i} key={i.category} />
            ))}
          </div>
        </div>
        <div className={styles.feasibility}>
          <div>
            <FaGift /> {rewardCount}
          </div>
          <div>
            <FaArrowUp /> {targetParticipants}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyFinderListItem;
