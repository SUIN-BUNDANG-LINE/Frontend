import { QuestionResult, Response } from '@/services/result/types';
import { Chart } from 'react-google-charts';

export default function QuestionChart({ questionResult }: { questionResult: QuestionResult }) {
  const { title, responses } = questionResult;

  const chartData = [
    ['Content', 'Count'],
    ...responses.map((response: Response) => [response.content, response.count]),
  ];

  return (
    <Chart
      chartType="PieChart" // 추후 차트 유형 선택 가능하도록 수정
      data={chartData}
      options={{
        title,
        sliceVisibilityThreshold: 0,
        animation: {
          startup: true,
          duration: 1000,
          easing: 'out',
        },
      }}
      width="600px"
      height="400px"
    />
  );
}
