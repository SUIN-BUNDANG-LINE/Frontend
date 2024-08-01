/* eslint-disable no-console, jsx-a11y/control-has-associated-label */

import { useState } from 'react';
import { useDrawingDraw, useDrawingInfo } from '@/services/drawing';
import Button from '@/components/ui/button/Button';
import Wrapper from '@/components/layout/Wrapper';
import Link from 'next/link';
import Board from './Board';
import Phone from './Phone';
import styles from './Drawing.module.css';

interface Props {
  surveyId: string;
  participantId: string;
}

export default function Drawing({ surveyId, participantId }: Props) {
  const { data: drawingInfo, isLoading, isError } = useDrawingInfo(surveyId);
  const mutation = useDrawingDraw(participantId);

  const [phone, setPhone] = useState<string>('');
  const [selected, setSelected] = useState<number | null>(null);

  if (isLoading) {
    return <div>loading board...</div>;
  }

  if (!drawingInfo || isError) {
    return <div>failed.</div>;
  }

  const onSubmit = () => {
    if (phone.length !== 11) return;
    if (selected === null) return;

    mutation.mutate(
      {
        phoneNumber: [phone.slice(0, 3), phone.slice(3, 7), phone.slice(7, 11)].join('-'),
        selectedNumber: selected,
      },
      {
        onSuccess(data) {
          console.log(data);
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
        <span>준비가 되었다면</span>
        <Button variant="primary" width="100%" height="48px" style={{ maxWidth: '360px' }} onClick={onSubmit}>
          추첨 참여하기
        </Button>
        <div className={styles.cool}>
          <span>리워드에 관심이 없다면... </span>
          <Link href={`/s/${surveyId}`}>그냥 돌아가기</Link>
        </div>
      </div>
    </Wrapper>
  );
}
