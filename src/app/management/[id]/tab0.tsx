/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import 'moment/locale/ko';
import { Chart } from 'react-google-charts';
import { getResults } from '@/services/result/fetch';
import type {
  SurveyResult,
  ResultFilter,
  QuestionFilter,
  SectionResult,
  QuestionResult,
  Response,
} from '@/services/result/types';
import styles from './tab0.module.css';

export default function Tab0({ surveyId }: { surveyId: string }) {
  const [data, setData] = useState<SurveyResult>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // resultFilter는 실제로 서버로 전달될 필터 상태
  const [resultFilter, setResultFilter] = useState<ResultFilter>({ questionFilters: [] });

  // tempFilters는 UI에서 사용자가 수정/추가하는 임시 필터 상태
  const [tempFilters, setTempFilters] = useState<QuestionFilter[]>([]);

  const defaultQuestionFilter: QuestionFilter = {
    questionId: '',
    contents: [],
    isPositive: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getResults({ surveyId, resultFilter });
        setData(response);
      } catch (err) {
        setError('설문 결과를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId, resultFilter]);

  const handleAddFilter = () => {
    setTempFilters((prev) => [...prev, { ...defaultQuestionFilter }]);
  };

  const handleRemoveFilter = (index: number) => {
    setTempFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFilterChange = (index: number, field: keyof QuestionFilter, value: any) => {
    const updatedFilters = tempFilters.map((filter, i) => (i === index ? { ...filter, [field]: value } : filter));
    setTempFilters(updatedFilters);
  };

  const handleSearch = () => {
    setResultFilter({ questionFilters: tempFilters });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h2>설문 결과 필터</h2>

      {/* 필터 추가 및 삭제 UI */}
      <div>
        {tempFilters.map((filter, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <label>
              질문 ID:
              <input
                type="text"
                value={filter.questionId}
                onChange={(e) => handleFilterChange(index, 'questionId', e.target.value)}
              />
            </label>

            <label>
              필터할 내용 (쉼표로 구분):
              <input
                type="text"
                value={filter.contents.join(',')}
                onChange={(e) =>
                  handleFilterChange(
                    index,
                    'contents',
                    e.target.value.split(',').map((content) => content.trim())
                  )
                }
              />
            </label>

            <label>
              긍정 필터 여부:
              <select
                value={filter.isPositive ? 'true' : 'false'}
                onChange={(e) => handleFilterChange(index, 'isPositive', e.target.value === 'true')}>
                <option value="true">포함</option>
                <option value="false">제외</option>
              </select>
            </label>

            <button type="button" onClick={() => handleRemoveFilter(index)}>
              필터 삭제
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddFilter}>
          필터 추가
        </button>
      </div>

      {/* 검색 버튼 */}
      <button type="button" onClick={handleSearch}>
        검색
      </button>

      {/* 설문 결과 */}
      <div>
        {data?.sectionResults.map((sectionResult: SectionResult) => {
          return sectionResult.questionResults.map((questionResult: QuestionResult) => {
            const chartData = [
              ['Content', 'Count'],
              ...questionResult.responses.map((response: Response) => [response.content, response.count]),
            ];

            return (
              <div key={questionResult.questionId}>
                <Chart
                  chartType="PieChart" // 추후 차트 유형 선택 가능하도록 수정
                  data={chartData}
                  options={{
                    title: `ID가 "${questionResult.questionId}"인 질문의 응답`,
                    sliceVisibilityThreshold: 0,
                    animation: {
                      startup: true, // 첫 로드 시 애니메이션 활성화
                      duration: 1000, // 1초 동안 애니메이션 실행
                      easing: 'out', // 'out' 애니메이션 설정
                    },
                  }}
                  width="600px"
                  height="400px"
                />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
