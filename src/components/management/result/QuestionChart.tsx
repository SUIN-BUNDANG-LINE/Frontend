import { Chart } from 'react-google-charts';

export default function QuestionChart() {
  return (
    <div key={questionResult.questionId}>
      <Chart
        chartType="PieChart" // 추후 차트 유형 선택 가능하도록 수정
        data={chartData}
        options={{
          title: `ID가 "${questionResult.questionId}"인 질문의 응답`,
          animation: {
            startup: true,
            duration: 1000,
            easing: 'out',
          },
        }}
        width="600px"
        height="400px"
      />
    </div>
  );
}
