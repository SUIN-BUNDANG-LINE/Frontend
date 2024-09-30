import Button from '@/components/ui/button/Button';
import { FaExternalLinkSquareAlt, FaGift, FaRegCalendarAlt } from 'react-icons/fa';
import { GiSpeakerOff } from 'react-icons/gi';
import moment from 'moment';
import { FaPeopleGroup } from 'react-icons/fa6';
import { Reward, RewardType } from '@/services/surveys/types';
import Link from 'next/link';
import { statusReader } from '@/utils/enumReader';
import styles from './Body.module.css';

interface Props {
  status: string;
  type: RewardType;
  targetParticipantCount: number | null;
  currentParticipantCount: number | null;
  finishedAt: string | null;
  rewards: Reward[];
  onStart: () => void;
}

export default function Body({
  status,
  type,
  targetParticipantCount,
  currentParticipantCount,
  finishedAt,
  rewards,
  onStart,
}: Props) {
  const [statusText, statusDetail] = statusReader(status);
  const StatusComponent =
    status === 'IN_PROGRESS' ? undefined : (
      <div className={styles.descriptor}>
        <GiSpeakerOff size="24px" />
        <div className={styles.status}>
          <div>응답을 받지 않습니다.</div>
          <div>
            {statusText}: {statusDetail}
          </div>
        </div>
      </div>
    );

  const RewardComponent = (() => {
    if (type === 'NO_REWARD' || finishedAt === null) return undefined;

    return (
      <>
        <div className={styles.descriptor}>
          <FaGift size="20px" />
          <div className={styles.status}>
            {type === 'SELF_MANAGEMENT' && <div>리워드를 지급합니다.</div>}
            {type === 'IMMEDIATE_DRAW' && <div>응답하면 즉시 추첨에 참여할 수 있습니다!</div>}
            <ul>
              {rewards.map((reward, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i}>
                  {reward.item} (x{reward.count})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.descriptor}>
          <FaRegCalendarAlt size="20px" />
          <div className={styles.status}>
            <div className={styles.endDate}>
              {moment(finishedAt).format('YYYY년 MM월 DD일 hh시')}까지 응답을 받습니다.
            </div>
          </div>
        </div>
        {type === 'IMMEDIATE_DRAW' && currentParticipantCount !== null && targetParticipantCount !== null && (
          <div className={styles.descriptor}>
            <FaPeopleGroup size="20px" />
            <div className={styles.status}>
              <div className={styles.endDate}>
                앞으로 {targetParticipantCount - currentParticipantCount}명이 추첨에 참여할 수 있습니다.
              </div>
            </div>
          </div>
        )}
      </>
    );
  })();

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <Button variant="primary" width="100%" height="48px" onClick={onStart} disabled={status !== 'IN_PROGRESS'}>
          참여하기
        </Button>
        <Link href="/" className={styles.link}>
          <span>설문이용 메인으로</span>
          <FaExternalLinkSquareAlt size="12px" />
        </Link>
        {(StatusComponent || RewardComponent) && <hr className={styles.hr} />}
        {StatusComponent}
        {RewardComponent}
      </div>
      {['IMMEDIATE_DRAW', 'SELF_MANAGEMENT'].includes(type) && (
        <div className={styles.clause}>
          <h4>리워드 관련 안내</h4>
          <ul>
            {type === 'IMMEDIATE_DRAW' && <li>낙첨된 경우 리워드는 지급되지 않습니다.</li>}
            <li>표시된 리워드와 수량은 설문 조사자가 지급하기로 약속한 내용입니다.</li>
            <li>리워드 관련 분쟁에 대해 설문이용은 일체의 책임을 지지 않습니다.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
