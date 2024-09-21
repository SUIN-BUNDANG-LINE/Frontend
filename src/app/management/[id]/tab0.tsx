import React, { useState } from 'react';
import 'moment/locale/ko';
import type { ResultFilter, SectionResult, QuestionFilter, QuestionResultInfo } from '@/services/result/types';
import SectionResultViewer from '@/components/management/result/SectionResultViewer';
import { useSurveyResult } from '@/services/result';
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import FilterManager from '@/components/management/result/FilterManager'; // 새로 만든 컴포넌트 임포트
import styles from './tab0.module.css';

export default function Tab0({ surveyId }: { surveyId: string }) {
  const [resultFilter, setResultFilter] = useState<ResultFilter>({ questionFilters: [] });
  const { data, isLoading, isError, refetch } = useSurveyResult(surveyId, resultFilter);

  const handleSearch = (filters: QuestionFilter[]) => {
    setResultFilter({ questionFilters: filters });
  };

  function makeResultInfo(): QuestionResultInfo[] {
    const questionResults = data?.sectionResults?.flatMap((sectionResult) => sectionResult.questionResults);
    if (questionResults === undefined) return [];
    return questionResults.flatMap((questionResult) => ({
      type: questionResult.type,
      title: questionResult.title,
      id: questionResult.questionId,
      contents: questionResult.responses.map((response) => response.content),
    }));
  }

  if (isLoading) return <Loading message="데이터를 불러오는 중..." />;
  if (isError)
    return (
      <div className={styles.error}>
        <Error message="데이터를 불러오지 못했습니다." buttons={[{ text: '재시도', fn: refetch }]} margin="18px" />
      </div>
    );

  return (
    <div className={styles.container}>
      {/* 필터 추가, 삭제 및 검색 관리 컴포넌트 */}
      <FilterManager onSearch={handleSearch} resultInfo={makeResultInfo()} />

      {/* 설문 결과 */}
      <div>
        {data?.sectionResults.map((sectionResult: SectionResult) => (
          <SectionResultViewer key={sectionResult.sectionId} sectionResult={sectionResult} />
        ))}
      </div>
    </div>
  );
}