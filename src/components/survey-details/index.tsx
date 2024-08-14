import { FiActivity } from 'react-icons/fi';
import { FaCalendarAlt, FaGift, FaInfoCircle, FaPaperclip } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Wrapper from '@/components/layout/Wrapper';
import Button from '@/components/ui/button/Button';
import Tooltip from '@/components/ui/tooltip/Tooltip';
import type { SurveysDetailsResponse } from '@/services/surveys/types';
import { convertToKst } from '@/utils/dates';
import { writeClipboard } from '@/utils/misc';
import styles from './index.module.css';

// TODO : utils로 이동
const statusReader = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS':
      return ['응답 받는 중', '바로 참여할 수 있습니다.'];
    case 'IN_MODIFICATION':
      return ['편집 중', '편집 중인 설문조사는 참여할 수 없습니다.'];
    case 'CLOSED':
      return ['마감', '마감된 설문조사입니다.'];
    default:
      return ['알 수 없음', '알 수 없음'];
  }
};

interface Props {
  data: SurveysDetailsResponse;
  surveyId: string;
  state: string | null;
}

export default function DetailsViewer({ data, surveyId, state }: Props) {
  const router = useRouter();

  const {
    title,
    description,
    status,
    finishedAt: rawFinishedAt,
    currentParticipants,
    targetParticipants,
    rewards,
    thumbnail,
  } = data;

  const finishedAt = convertToKst(rawFinishedAt);

  const copyUrl = () => {
    writeClipboard(window.location.href);
  };

  const participate = () => {
    router.push(`/s/${surveyId}/p`);
  };

  const [statusTitle, statusDescription] = statusReader(status);

  return (
    <>
      <Wrapper outerColor="#fff">
        <div className={styles.image_headline}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.image} src={thumbnail} alt="" width={180} height={180} />
          <div className={styles.headline}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
        <div className={styles.share}>
          <Button variant="default" onClick={() => copyUrl()}>
            <FaPaperclip />
            <span>URL 복사</span>
          </Button>
        </div>
      </Wrapper>
      <Wrapper>
        <div className={styles.contentsWrapper}>
          <div className={styles.contents}>
            <div className={styles.participate}>
              <Button
                variant="primary"
                width="100%"
                height="46px"
                onClick={() => participate()}
                disabled={state === '$' || status !== 'IN_PROGRESS'}>
                {state === '$' ? '참여 완료' : '참여하기'}
              </Button>
              <div>
                <Link href="/">설문이용 메인으로</Link>
              </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.details}>
              <div>
                <FiActivity />
                <div className={styles.status}>
                  {statusTitle}
                  <Tooltip text={statusDescription}>
                    <FaInfoCircle />
                  </Tooltip>
                </div>
              </div>
              <div>
                <FaCalendarAlt />
                <div>
                  {finishedAt.year}년 {finishedAt.month}월 {finishedAt.date}일 {finishedAt.hour}시 자동 마감
                </div>
              </div>
              <div>
                <FaUserGroup />
                <div className={styles.participants}>
                  <div>{currentParticipants}명 응답 완료</div>
                  <div>/ 최대 {targetParticipants}명 응답 가능</div>
                </div>
              </div>
              <div>
                <FaGift />
                <div className={styles.rewards}>
                  {rewards.map((reward) => (
                    <div className={styles.reward} key={`${reward.item}`}>
                      <div className={styles.item}>{reward.item}</div>
                      <div className={styles.count}>x {reward.count}</div>
                    </div>
                  ))}
                </div>
              </div>
              <ul className={styles.clause}>
                <li>* 설문 조사자가 지급을 약속한 리워드와 수량입니다.</li>
                <li>* 리워드는 추첨을 퉁해 지급되며, 낙첨된 경우 지급되지 않습니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
