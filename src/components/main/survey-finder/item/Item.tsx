'use client';

import Link from 'next/link';
import { FaGift } from 'react-icons/fa';
import { dateReader } from '@/utils/dates';
import Tooltip from '@/components/ui/tooltip/Tooltip';
import type { Survey } from '../types';
import styles from './Item.module.css';

export default function ListItem({ survey }: { survey: Survey }) {
  const { surveyId, thumbnail, title, description, targetParticipants, rewardCount, finishedAt, rewards } = survey;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <Link className={styles.item} href={`/s/${surveyId}`}>
      <div
        className={styles.thumbnail}
        style={{
          backgroundColor: 'var(--gray-ml)',
          backgroundSize: 'cover',
          backgroundImage: `url("${thumbnail || '/assets/default-thumbnail.webp'}")`,
        }}
      />
      <div className={styles.info}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.time}>{finishedAt ? dateReader(finishedAt) : '응답 받는 중'}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.feasibility}>
          {rewardCount > 0 && (
            <div>
              <Tooltip
                text={`${rewards
                  .map((reward) => {
                    const { items } = reward;
                    return items.join(', ');
                  })
                  .join(', ')}`}>
                <FaGift /> {targetParticipants !== null ? '즉시 추첨' : '리워드 지급'}
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
