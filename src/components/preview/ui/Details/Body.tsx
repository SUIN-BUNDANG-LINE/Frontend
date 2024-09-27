import Button from '@/components/ui/button/Button';
import { FaExternalLinkSquareAlt, FaGift, FaRegCalendarAlt } from 'react-icons/fa';
import { GiSpeakerOff } from 'react-icons/gi';
import { Store } from '@/components/workbench/types';
import moment from 'moment';
import { FaPeopleGroup } from 'react-icons/fa6';
import styles from './Body.module.css';

interface Props {
  status: [string, string];
  rewardConfig: Store['rewardConfig'];
  onStart: () => void;
}

export default function Body({ status, rewardConfig, onStart }: Props) {
  const Status =
    status[0] === '응답 받는 중' ? undefined : (
      <div className={styles.descriptor}>
        <GiSpeakerOff size="24px" />
        <div className={styles.status}>
          <div>응답을 받지 않습니다.</div>
          <div>
            {status[0]}: {status[1]}
          </div>
        </div>
      </div>
    );

  const Reward = (() => {
    const { type, targetParticipantCount, finishedAt, rewards } = rewardConfig;
    if (type === 'NO_REWARD') return undefined;

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
                  {reward.name} (x{reward.count})
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
        {type === 'IMMEDIATE_DRAW' && (
          <div className={styles.descriptor}>
            <FaPeopleGroup size="20px" />
            <div className={styles.status}>
              <div className={styles.endDate}>최대 {targetParticipantCount}명까지 추첨에 참여할 수 있습니다.</div>
            </div>
          </div>
        )}
      </>
    );
  })();

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <Button variant="primary" width="100%" height="48px" onClick={onStart}>
          참여하기
        </Button>
        <div className={styles.link}>
          <span>설문이용 메인으로</span>
          <FaExternalLinkSquareAlt size="12px" />
        </div>
        {(Status || Reward) && <hr className={styles.hr} />}
        {Status}
        {Reward}
      </div>
      <div className={styles.clause}>
        <h4>리워드 관련 안내</h4>
        <ul>
          <li>낙첨된 경우 리워드는 지급되지 않습니다.</li>
          <li>표시된 리워드와 수량은 설문 조사자가 지급하기로 약속한 내용입니다.</li>
          <li>리워드 관련 분쟁에 대해 설문이용은 일체의 책임을 지지 않습니다.</li>
        </ul>
      </div>
    </div>
  );
}
