import { useState, useEffect } from 'react';
import type { ResultFilter, SectionResult, QuestionFilter, QuestionResultInfo } from '@/services/result/types';
import SectionResultViewer from '@/components/management/result/SectionResultViewer';
import { useSurveyResult } from '@/services/result';
import { FaUsers } from 'react-icons/fa';
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import FilterManager from '@/components/management/result/FilterManager';
import styles from './tab0.module.css';

export default function Tab0({ surveyId }: { surveyId: string }) {
  const [resultFilter, setResultFilter] = useState<ResultFilter>({ questionFilters: [] });
  const [isManualSearch, setIsManualSearch] = useState(false);
  const { data, isLoading, isError, refetch } = useSurveyResult(surveyId, resultFilter, undefined);

  const handleSearch = (filters: QuestionFilter[]) => {
    setResultFilter({ questionFilters: filters });
    setIsManualSearch(true);
  };

  useEffect(() => {
    if (isManualSearch) {
      refetch();
      setIsManualSearch(false);
    }
  }, [isManualSearch, refetch]);

  function makeResultInfo(): QuestionResultInfo[] {
    const questionResults = data?.sectionResults?.flatMap((sectionResult) => sectionResult.questionResults);
    if (questionResults === undefined) return [];
    return questionResults.flatMap((questionResult) => ({
      type: questionResult.type,
      title: questionResult.title,
      id: questionResult.questionId,
      contents: questionResult.responseContents,
    }));
  }

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Loading message="데이터를 불러오는 중..." />
      </div>
    );
  if (isError)
    return (
      <div className={styles.error}>
        <Error message="데이터를 불러오지 못했습니다." buttons={[{ text: '재시도', fn: refetch }]} margin="18px" />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.participantInfo}>
        <div className={styles.participantInfoContent}>
          <FaUsers className={styles.participantIcon} />
        </div>
        <div className={styles.participantInfoContent}>응답자 수 : {data?.participantCount}명</div>
      </div>
      <FilterManager onSearch={handleSearch} resultInfo={makeResultInfo()} />
      {data?.sectionResults.map((sectionResult: SectionResult) => (
        <SectionResultViewer key={sectionResult.sectionId} sectionResult={sectionResult} />
      ))}
    </div>
  );
}
