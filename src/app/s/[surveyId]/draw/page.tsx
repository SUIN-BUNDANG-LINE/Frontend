'use client';

import Wrapper from '@/components/layout/Wrapper';
import Button from '@/components/ui/button/Button';
import Board from '@/components/survey-p/drawing/Board';
import Phone from '@/components/survey-p/drawing/Phone';
import Error from '@/components/ui/error/Error';
import Loading from '@/components/ui/loading/Loading';
import { useDrawingInfo, useDrawingDraw } from '@/services/drawing';
import { ErrorCause } from '@/services/ky-wrapper';
import { getSurveyState, setSurveyState } from '@/components/survey-p/funcs/storage';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useSurveysDetails } from '@/services/surveys';
import { showToast } from '@/utils/toast';
import { v4 } from 'uuid';
import styles from './page.module.css';

export default function Page({ params }: { params: { surveyId: string } }) {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const nextRouter = useRouter();

  const { surveyId } = params;
  const pid = searchParams.get('pid') ? decodeURIComponent(searchParams.get('pid')!) : null;
  const [surveyState] = useState(getSurveyState(surveyId));

  const drawingInfo = useDrawingInfo(surveyId);
  const surveyDetails = useSurveysDetails(surveyId);
  const mutation = useDrawingDraw(pid || '');

  const [phone, setPhone] = useState<string>('');
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => setIsClient(true), []);

  // Hydration 문제 해결
  if (!isClient) {
    return <Loading message="추첨 페이지를 불러오는 중..." />;
  }

  // 참여자 ID 혹은 참여 기록이 없으면 돌아가기
  if (!pid || !surveyState) {
    showToast('error', '추첨에 참여할 수 없습니다.');
    nextRouter.push(`/s/${surveyId}`);
    return <div />;
  }

  // 이미 추첨에 참여했으면 돌아가기
  if (surveyState === '$') {
    showToast('error', '추첨에 이미 참여했습니다.');
    nextRouter.push(`/s/${surveyId}`);
    return <div />;
  }

  // 정보를 아직 불러오지 못했으면 로드 메시지
  if (drawingInfo.isLoading || surveyDetails.isLoading) {
    return <Loading message="추첨 정보를 불러오는 중..." />;
  }

  // 에러가 발생했거나 data에 문제가 있으면 에러
  if (drawingInfo.isError || surveyDetails.isError || !drawingInfo.data || !surveyDetails.data) {
    const t = drawingInfo.error ? (drawingInfo.error.cause as ErrorCause).message : '추첨 정보를 불러오지 못했습니다.';
    return <Error message={t} buttons={[{ text: '재시도', fn: () => window.location.reload() }]} />;
  }

  const validPhone = phone.length === 8;
  const validSelected = selected !== null;

  const onSubmit = () => {
    if (!validPhone || !validSelected) return;

    setSubmitting(true);
    setError(null);

    mutation.mutate(
      {
        phoneNumber: `010${phone}`,
        selectedNumber: selected,
      },
      {
        onSuccess(data) {
          setSurveyState(surveyId, '$');
          if (data.isWon) {
            const rewardParams = [`reward=${encodeURIComponent(data.rewardName)}`];
            if (surveyDetails.data.finishedAt) {
              rewardParams.push(`until=${encodeURIComponent(surveyDetails.data.finishedAt)}`);
            }
            nextRouter.push(`/s/${surveyId}/result?${rewardParams.join('&')}`);
          } else {
            nextRouter.push(`/s/${surveyId}/result`);
          }
        },
        onError(err) {
          const { code, message } = err.cause as ErrorCause;

          switch (code) {
            case 'DT0001': // 유효하지 않은 전화번호입니다.
              phoneRef.current?.focus();
              break;
            case 'DR0004': // 이미 선택된 티켓입니다.
              setSelected(null);
              drawingInfo.refetch();
              break;
            case 'DR0005': // 이미 마감된 추첨입니다.
              window.location.reload();
              break;
            default:
          }
          setSubmitting(false);
          setError(message || '알 수 없는 문제가 발생했습니다.');
        },
      }
    );
  };

  return (
    <Wrapper>
      <div className={styles.container}>
        <h1>리워드 추첨</h1>
        <div className={styles.field}>
          <div>본 설문조사는 추첨을 통해 다음과 같은 리워드를 지급합니다.</div>
          <div className={styles.rewards}>
            {surveyDetails.data.rewards.map((reward) => (
              <div key={v4()} className={styles.rewardItem}>
                <span>{reward.item}</span>
                <span>(총 {reward.count}개)</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <h2>1. 추첨권을 선택해주세요.</h2>
          <span className={styles.description}>반투명한 추첨권은 이미 선택된 추첨권입니다.</span>
          <Board
            selected={selected}
            setSelected={setSelected}
            tickets={drawingInfo.data.tickets.map((gone, id) => ({ gone, id }))}
          />
        </div>
        <div className={styles.field}>
          <h2>2. 리워드를 받을 전화번호를 입력해주세요.</h2>
          <span className={styles.description}>
            입력한 전화번호로 리워드가 지급되게 되므로, 사용하는 전화번호를 입력해주세요.
          </span>
          <Phone phone={phone} setPhone={setPhone} ref={phoneRef} />
        </div>
        <hr className={styles.hr} />
        <div className={styles.submit}>
          <Button
            variant="primary"
            height="48px"
            style={{ width: '100%', maxWidth: '360px' }}
            onClick={onSubmit}
            disabled={!validPhone || !validSelected || submitting}>
            {submitting ? '결과를 기다리는 중...' : '추첨 참여하기'}
          </Button>
          {error && <div className={styles.error}>{error}</div>}
        </div>
        <div className={styles.cool}>
          <span>리워드에 관심이 없다면 </span>
          <Link href={`/s/${surveyId}`}>그냥 종료하기</Link>
        </div>
      </div>
    </Wrapper>
  );
}
