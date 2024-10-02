import Link from 'next/link';
import styles from './index.module.css';

interface Props {
  surveyId: string;
  reward: string | null;
}

export default function SurveyResult({ surveyId, reward }: Props) {
  return (
    <div className={styles.container}>
      <h3>추첨 결과</h3>
      {!reward && <div>아쉽게도 낙첨되셨습니다.</div>}
      {reward && <div>{reward} 당첨!</div>}
      {reward && (
        <div>
          📅 <strong>2024년 8월 19일</strong>까지 리워드를 지급할 예정입니다.
        </div>
      )}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <Link href={`/s/${surveyId}`}>설문조사 첫 페이지로</Link>
        <Link href="/">설문이용 메인으로</Link>
      </div>
    </div>
  );
}
