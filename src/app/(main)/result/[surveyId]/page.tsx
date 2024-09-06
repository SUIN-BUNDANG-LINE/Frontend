'use client';

import { Chart } from 'react-google-charts';
import { useEffect, useState } from 'react';
import { getResults } from '../../../../services/result/fetch';
import type { Results } from './type';

export default function Page({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;
  const [data, setData] = useState<Results | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getResults({ surveyId });
        setData(response);
      } catch (err) {
        setError('설문 결과를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {data?.results.map((result) => {
        const chartData = [
          ['Content', 'Count'],
          ...result.responses.map((response) => [response.content, response.count]),
        ];

        return (
          <div key={result.questionId}>
            <Chart
              chartType="PieChart" // 추후 차트 유형 선택 가능하도록 수정
              data={chartData}
              options={{ /* 추후 다른 옵션 추가 */ title: `ID가 "${result.questionId}"인 질문의 응답` }}
              width="600px"
              height="400px"
            />
          </div>
        );
      })}
    </div>
  );
}
