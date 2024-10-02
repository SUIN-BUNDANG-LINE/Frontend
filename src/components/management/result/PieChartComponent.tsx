import { Response } from '@/services/result/types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from './PieChartComponent.module.css';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export default function PieChartComponent({ responses }: { responses: Response[] }) {
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
            const total = context.chart.data.datasets[context.datasetIndex].data.reduce(
              (acc: number, val: number) => acc + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
    },
  };

  const legendItems = data.labels.map((label: string) => (
    <div key={label} className={styles.legendItem} title={label}>
      <div
        className={styles.legendColorBox}
        style={{ backgroundColor: data.datasets[0].backgroundColor[data.labels.indexOf(label)] }}
      />
      <div className={styles.legendLabel}>{label}</div>
    </div>
  ));

  return (
    <div className={styles.chartContainer}>
      <div className={styles.pieChart}>
        <Pie data={data} options={options} />
      </div>
      <div className={styles.legendContainer}>{legendItems}</div>
    </div>
  );
}
