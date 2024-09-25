import React from 'react';
import { useParticipants } from '@/services/participant';
import ParticipantSummary from '@/components/management/participant/ParticipantSummary';
import WinnerList from '@/components/management/participant/WinnerList';
import ParticipantList from '@/components/management/participant/ParticipantList';
import Error from '@/components/ui/error/Error';
import Loading from '@/components/ui/loading/Loading';
import { ParticipantInfo } from '@/services/participant/types';
import styles from './tab1.module.css';

export default function Tab1({ surveyId }: { surveyId: string }) {
  const { data, isLoading, isError, refetch } = useParticipants(surveyId);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Loading message="데이터를 불러오는 중..." />
      </div>
    );
  if (isError)
    return (
      <div className={styles.error}>
        <Error message="마이페이지를 불러오지 못했습니다." buttons={[{ text: '재시도', fn: refetch }]} margin="18px" />
      </div>
    );

  const participants: ParticipantInfo[] = data ? data.participants : [];
  const targetParticipant = data?.targetParticipant ? data.targetParticipant : null;
  const isImmediateDraw = targetParticipant !== null;

  const participantsWithDraw = participants.filter((p) => p.drawInfo && p.drawInfo.drawResult !== 'BEFORE_DRAW');

  const winners = participantsWithDraw.filter((p) => p.drawInfo?.drawResult === 'WIN');

  return (
    <div className={styles.container}>
      <ParticipantSummary
        responseCount={participants.length}
        drawCount={participantsWithDraw.length}
        targetParticipant={targetParticipant}
        winningCount={winners.length}
        handleRefetch={() => refetch()}
      />
      {isImmediateDraw && <WinnerList winners={winners} />}
      <ParticipantList participants={participants} />
    </div>
  );
}
