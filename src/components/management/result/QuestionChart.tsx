/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionResult, Response } from '@/services/result/types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 필요한 차트 구성 요소 등록
ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export default function QuestionChart({ questionResult }: { questionResult: QuestionResult }) {
  const { title, responses, participantCount } = questionResult;

  // Chart.js에서 사용할 데이터 구조
  const data = {
    labels: responses.map((response: Response) => response.content),
    datasets: [
      {
        data: responses.map((response: Response) => response.count),
        backgroundColor: [
          '#3366CC',
          '#DC3912',
          '#FF9900',
          '#109618',
          '#990099',
          '#0099C6',
          '#DD4477',
          '#66AA00',
          '#B82E2E',
          '#316395',
          '#994499',
          '#22AA99',
          '#AAAA11',
          '#6633CC',
          '#E67300',
          '#8B0707',
          '#651067',
          '#329262',
          '#5574A6',
          '#3B3EAC',
        ],
        hoverOffset: 8,
      },
    ],
  };

  // 차트 옵션 (범례 비활성화)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 기본 범례 비활성화
      },
      title: {
        display: false, // 제목은 별도로 렌더링하므로 비활성화
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        display: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = (value / total) * 100;
          return percentage > 5; // 퍼센티지가 5% 이상인 경우에만 표시
        },
        color: '#fff',
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
    },
    layout: {
      padding: 0, // 불필요한 패딩 제거
    },
  };

  // 범례 아이템 스타일을 수정하여 가로 너비를 남은 공간으로 채우고, 글씨가 잘리면 ...으로 나타나도록 설정합니다.
  const legendItems = data.labels.map((label, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
      }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: data.datasets[0].backgroundColor[index],
          marginRight: '8px',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontSize: '14px',
          flexGrow: 1,
          textOverflow: 'ellipsis', // 긴 텍스트 말줄임표 처리
          overflow: 'hidden', // 넘치는 텍스트 숨기기
          whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
          minWidth: 0, // flex 아이템이 줄어들 수 있도록 설정
        }}>
        {label}
      </div>
    </div>
  ));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF', // 흰색 배경
        boxShadow: '-6px 0px 0px 0px rgb(255, 213, 33)', // 그림자를 왼쪽으로 이동
        borderRadius: '4px', // 둥근 모서리
        padding: '20px', // 컨텐츠와 박스 사이의 여백
        marginBottom: '20px', // 질문 사이의 간격 추가
      }}>
      {/* 질문 제목 */}
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '8px',
          textAlign: 'left', // 좌측 정렬
          paddingLeft: '10px', // 좌측 여백
        }}>
        {title}
      </h2>

      {/* 참가자 수 */}
      <p
        style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '20px',
          paddingLeft: '10px', // 좌측 여백
        }}>
        응답자 수: {participantCount}명
      </p>

      {/* 차트와 범례를 담은 컨테이너 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}>
        {/* 차트 컨테이너 */}
        <div
          style={{
            width: '80%',
            maxWidth: '400px',
            maxHeight: '400px',
            minHeight: '250px',
            flexShrink: 0,
          }}>
          <Pie data={data} options={options} />
        </div>
        {/* 범례 컨테이너 */}
        <div
          style={{
            marginLeft: '20px',
            width: '20%',
            maxHeight: '400px', // 범례 컨테이너의 최대 높이 설정
            overflowY: 'auto', // 스크롤바 표시
          }}>
          {legendItems}
        </div>
      </div>
    </div>
  );
}
