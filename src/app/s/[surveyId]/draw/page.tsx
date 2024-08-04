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
import { useState, useRef } from 'react';
import styles from './page.module.css';

export default function Page({ params }: { params: { surveyId: string } }) {
  const searchParams = useSearchParams();
  const nextRouter = useRouter();

  const { surveyId } = params;
  const pid = searchParams.get('pid') ? decodeURIComponent(searchParams.get('pid')!) : null;
  const [surveyState] = useState(getSurveyState(surveyId));

  const { data: drawingInfo, isLoading, isError, refetch } = useDrawingInfo(surveyId);
  const mutation = useDrawingDraw(pid || '');

  const [phone, setPhone] = useState<string>('');
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const phoneRef = useRef<HTMLInputElement>(null);

  if (!pid || !surveyState) {
    return (
      <Error message="부정한 접근입니다." buttons={[{ text: '나가기', fn: () => nextRouter.push(`/s/${surveyId}`) }]} />
    );
  }

  if (surveyState === '$') {
    return (
      <Error
        message="이미 참여한 추첨입니다."
        buttons={[{ text: '나가기', fn: () => nextRouter.push(`/s/${surveyId}`) }]}
      />
    );
  }

  if (isLoading) {
    return <Loading message="추첨 페이지를 로드하는 중..." />;
  }

  if (isError || !drawingInfo) {
    return <Error message="추첨 페이지를 불러오지 못했습니다." buttons={[{ text: '재시도', fn: refetch }]} />;
  }

  const validPhone = phone.length === 13;
  const validSelected = selected !== null;

  const onSubmit = () => {
    if (!validPhone || !validSelected) return;

    setSubmitting(true);
    setError(null);

    mutation.mutate(
      {
        phoneNumber: phone,
        selectedNumber: selected,
      },
      {
        onSuccess(data) {
          setSurveyState(surveyId, '$');
          if (data.isWon) {
            nextRouter.push(`/s/${surveyId}/result?reward=${encodeURIComponent(data.rewardName)}`);
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
              refetch();
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
          <h2>1. 추첨권을 선택해주세요.</h2>
          <span className={styles.description}>반투명한 추첨권은 이미 선택된 추첨권입니다.</span>
          <Board
            selected={selected}
            setSelected={setSelected}
            tickets={drawingInfo.tickets.map((gone, id) => ({ gone, id }))}
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
            width="100%"
            height="48px"
            style={{ maxWidth: '360px' }}
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
