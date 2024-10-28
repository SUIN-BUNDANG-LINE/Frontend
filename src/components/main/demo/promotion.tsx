import Link from 'next/link';
import Field from '@/components/workbench/ai/preview/field';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import styles from './promotion.module.css';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

function CompareExample() {
  const [state, setState] = React.useState(false);

  return (
    <div className={styles.preview}>
      <div className={styles.previewWrapper}>
        <Field
          changeType={state ? 'MODIFIED' : 'UNCHANGED'}
          oldField={{
            type: 'checkbox',
            options: [{ id: '1-1-1', content: '스타벅스' }],
            title: '자주 방문하는 커피 체인점은?',
            description: '자주 방문하는 커피 체인점을 모두 선택해 주세요.',
            sectionId: '1',
            fieldId: '1-1',
            other: true,
            required: true,
          }}
          newField={
            state
              ? {
                  type: 'checkbox',
                  options: [
                    { id: '1-1-1', content: '스타벅스' },
                    { id: '1-1-2', content: '투썸플레이스' },
                    { id: '1-1-3', content: '이디야' },
                  ],
                  title: '자주 방문하는 커피 체인점은?',
                  description: '자주 방문하는 커피 체인점을 모두 선택해 주세요.',
                  sectionId: '1',
                  fieldId: '1-1',
                  other: true,
                  required: true,
                }
              : undefined
          }
          index="1-1"
        />
      </div>
      {!state && (
        <button type="button" className={styles.chatWrapper} onClick={() => setState(true)}>
          <div className={styles.chat}>
            <div>
              <IoChatbubbleEllipsesOutline /> <span>유명한 곳으로 더 추가해줘</span>
            </div>
            <div>클릭해보세요</div>
          </div>
        </button>
      )}
    </div>
  );
}

function StatisticsExample() {
  const [state, setState] = React.useState(false);

  const data = {
    labels: ['스타벅스', '투썸플레이스', '이디야'],
    datasets: [
      {
        label: '조사',
        data: !state ? [42, 40, 32] : [30, 12, 8],
        backgroundColor: ['#f38aa1', '#6dbdf3', 'rgba(255, 206, 86, 1)'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: (value: number, context) => {
          const total = (context.chart.data.datasets[0].data as number[]).reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        display: (context) => {
          const value = context.dataset.data[context.dataIndex] as number;
          const total = (context.chart.data.datasets[0].data as number[]).reduce((acc, val) => acc + val, 0);
          const percentage = (value / total) * 100;
          return percentage > 5;
        },
        color: '#fff',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const total = (context.chart.data.datasets[0].data as number[]).reduce((acc, val) => {
              if (typeof val === 'number') {
                return acc + val;
              }
              return acc;
            }, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 500,
    },
  };

  return (
    <div className={styles.preview}>
      <Pie data={data} options={options} />
      {!state && (
        <button type="button" className={styles.chatWrapper} onClick={() => setState(true)}>
          <div className={styles.chat}>
            <div>
              <FaSearch /> <span>&lsquo;인천 거주자&rsquo; 라고 답한 사람의 응답 보기</span>
            </div>
            <div>클릭해보세요</div>
          </div>
        </button>
      )}
    </div>
  );
}

export default function Promotion() {
  return (
    <div className={styles.promotion}>
      <div className={styles.title}>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
        하면 더 많은 기능을 사용할 수 있어요.
      </div>
      <div className={styles.section}>
        <h4>AI와 함께 설문지 편집하기</h4>
        <CompareExample />
        <p>
          선택지 구성부터 오탈자 수정까지, 상상만 해도 귀찮고 머리가 지끈거리는 작업을 AI의 도움으로 간편하게
          해결하세요.
        </p>
      </div>
      <div className={styles.section}>
        <h4>손쉬운 결과 분석</h4>
        <StatisticsExample />
        <p>설문이용이 제공하는 필터를 이용해 원하는 응답만 골라서 볼수 있어요.</p>
      </div>
    </div>
  );
}
