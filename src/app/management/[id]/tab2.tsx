import { useState, useEffect, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from 'react-icons/fa'; // 아이콘 추가
import moment from 'moment';
import type { SectionResult } from '@/services/result/types';
import SectionResultViewer from '@/components/management/result/SectionResultViewer';
import { useSurveyResult } from '@/services/result';
import { useParticipants } from '@/services/participant';
import { deleteURLSearchParam } from '@/utils/url-search-params';
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import styles from './tab2.module.css';

export default function Tab2({ surveyId, participantId }: { surveyId: string; participantId: string | null }) {
  const {
    data: participantData,
    isLoading: participantsIsLoading,
    isError: participantsIsError,
    refetch: participantsRefetch,
  } = useParticipants(surveyId);

  const participants = useMemo(() => {
    return participantData?.participants || [];
  }, [participantData]);

  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [inputIndex, setInputIndex] = useState(currentParticipantIndex.toString());

  useEffect(() => {
    if (participants.length > 0) {
      if (participantId) {
        const index = participants.findIndex((p) => p.participantId === participantId);
        if (index !== -1) {
          setCurrentParticipantIndex(index);
          setInputIndex((index + 1).toString());
        } else {
          setCurrentParticipantIndex(0);
          setInputIndex('1');
        }
      } else {
        setCurrentParticipantIndex(0);
        setInputIndex('1');
      }
    }
  }, [participants]);

  const currentParticipantId =
    participants.length > 0 ? participants[currentParticipantIndex].participantId : undefined;

  const { data, isLoading, isError, refetch } = useSurveyResult(
    surveyId,
    { questionFilters: [] },
    currentParticipantId,
    {
      enabled: !!currentParticipantId, // currentParticipantId가 있을 때만 쿼리 실행
    }
  );

  if (participantsIsLoading)
    return (
      <div className={styles.loading}>
        <Loading message="참가자 목록을 불러오는 중..." />
      </div>
    );

  if (participantsIsError)
    return (
      <div className={styles.error}>
        <Error
          message="참가자 목록을 불러오지 못했습니다."
          buttons={[{ text: '재시도', fn: participantsRefetch }]}
          margin="18px"
        />
      </div>
    );

  if (participants.length === 0) {
    return <div>참가자가 없습니다.</div>;
  }

  const handlePrevParticipant = () => {
    deleteURLSearchParam('participantId');
    if (currentParticipantIndex > 0) {
      setCurrentParticipantIndex(currentParticipantIndex - 1);
      setInputIndex(currentParticipantIndex.toString());
    }
  };

  const handleNextParticipant = () => {
    deleteURLSearchParam('participantId');
    if (currentParticipantIndex < participants.length - 1) {
      setCurrentParticipantIndex(currentParticipantIndex + 1);
      setInputIndex((currentParticipantIndex + 2).toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputIndex(value);

    if (value === '' || Number.isNaN(Number(value))) return;
    const index = parseInt(value, 10) - 1;
    if (index >= 0 && index < participants.length) {
      setCurrentParticipantIndex(index);
    }
  };

  const currentParticipant = participants[currentParticipantIndex];

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.navigation}>
          <button
            type="button"
            onClick={handlePrevParticipant}
            disabled={currentParticipantIndex === 0}
            className={styles.navButton}
            aria-label="이전 참가자">
            <FaArrowLeft />
          </button>
          <input
            type="text"
            value={inputIndex}
            onChange={handleInputChange}
            className={styles.indexInput}
            aria-label="참가자 인덱스 입력"
          />
          <span>/ {participants.length}</span>
          <button
            type="button"
            onClick={handleNextParticipant}
            disabled={currentParticipantIndex === participants.length - 1}
            className={styles.navButton}
            aria-label="다음 참가자">
            <FaArrowRight />
          </button>
        </div>
        <div className={styles.participationDate}>
          <FaCalendarAlt className={styles.calendarIcon} />
          <span>참가 일시: {moment(currentParticipant.participatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
      </div>

      {(() => {
        if (isLoading) {
          return (
            <div className={styles.loading}>
              <Loading message="데이터를 불러오는 중..." />
            </div>
          );
        }
        if (isError) {
          return (
            <div className={styles.error}>
              <Error
                message="데이터를 불러오지 못했습니다."
                buttons={[{ text: '재시도', fn: refetch }]}
                margin="18px"
              />
            </div>
          );
        }
        return data?.sectionResults.map((sectionResult: SectionResult) => (
          <SectionResultViewer key={sectionResult.sectionId} sectionResult={sectionResult} />
        ));
      })()}
    </div>
  );
}
