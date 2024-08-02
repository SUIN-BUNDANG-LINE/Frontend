/* eslint-disable no-console, jsx-a11y/control-has-associated-label */

import { useState } from 'react';
import { useDrawingDraw, useDrawingInfo } from '@/services/drawing';
import Button from '@/components/ui/button/Button';
import Wrapper from '@/components/layout/Wrapper';
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

  const { data: drawingInfo, isLoading, isError } = useDrawingInfo(surveyId);
  const mutation = useDrawingDraw(participantId);

  const [phone, setPhone] = useState<string>('');
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return <div>loading board...</div>;
  }

  if (!drawingInfo || isError) {
    return <div>failed.</div>;
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
          if (err.message.includes('400')) {
            setError('이미 참여한 사용자입니다.');
          } else {
            setError('추첨에 오류가 발생했습니다.');
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
          <Phone phone={phone} setPhone={setPhone} />
        </div>
        <span style={{ fontSize: '32px', color: 'var(--gray)' }}>⋮</span>
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
          <span>리워드에 관심이 없다면... </span>
          <Link href={`/s/${surveyId}`}>그냥 돌아가기</Link>
        </div>
      </div>
    </Wrapper>
  );
}
