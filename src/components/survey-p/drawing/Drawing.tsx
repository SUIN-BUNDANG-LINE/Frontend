/* eslint-disable no-console, jsx-a11y/control-has-associated-label */

import { useRef, useState } from 'react';
import { useDrawingDraw, useDrawingInfo } from '@/services/drawing';
import Loading from '@/components/ui/loading/Loading';
import Button from '@/components/ui/button/Button';
import Wrapper from '@/components/layout/Wrapper';
import type { ErrorCause } from '@/services/ky-wrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Board from './Board';
import Phone from './Phone';
import styles from './Drawing.module.css';

interface Props {
  surveyId: string;
  participantId: string;
}

export default function Drawing({ surveyId, participantId }: Props) {
  const nextRouter = useRouter();

  const { data: drawingInfo, isLoading, isError, refetch } = useDrawingInfo(surveyId);
  const mutation = useDrawingDraw(participantId);

  const [phone, setPhone] = useState<string>('');
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const phoneRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <Loading message="추첨 페이지를 로드하는 중..." />;
  }

  if (!drawingInfo || isError) {
    return <div>문제가 발생했습니다.</div>;
  }

  const validPhone = phone.length === 11;
  const validSelected = selected !== null;

  const onSubmit = () => {
    if (!validPhone || !validSelected) return;
    setError(null);

    mutation.mutate(
      {
        phoneNumber: [phone.slice(0, 3), phone.slice(3, 7), phone.slice(7, 11)].join('-'),
        selectedNumber: selected,
      },
      {
        onSuccess(data) {
          if (data.isWon) {
            nextRouter.push(`/s/${surveyId}/result?reward=${encodeURIComponent(data.rewardName)}`);
          } else {
            nextRouter.push(`/s/${surveyId}/result`);
          }
        },
        onError(err) {
          const { code, message } = err.cause as ErrorCause;

          console.log(code, message);

          switch (code) {
            case 'DT0001': // 유효하지 않은 전화번호입니다.
              phoneRef.current?.focus();
              setError(message);
              break;
            case 'DR0004': // 이미 선택된 티켓입니다.
              setSelected(null);
              setError(message);
              refetch();
              break;
            default:
              setError(message || '알 수 없는 문제가 발생했습니다.');
          }
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
          {error && <div className={styles.error}>⚠️ {error}</div>}
          <Button
            variant="primary"
            width="100%"
            height="48px"
            style={{ maxWidth: '360px' }}
            onClick={onSubmit}
            disabled={!validPhone || !validSelected}>
            추첨 참여하기
          </Button>
        </div>
        <div className={styles.cool}>
          <span>리워드에 관심이 없다면 </span>
          <Link href={`/s/${surveyId}`}>그냥 종료하기</Link>
        </div>
      </div>
    </Wrapper>
  );
}
