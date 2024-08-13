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
          📅 <strong>2024년 8월 18일</strong>까지 리워드를 지급할 예정입니다.
        </div>
      )}
      <hr />
      <div>
        <h3>설문이용 이용 경험에 대해 이야기해주세요!</h3>
        <a target="_blank" href="https://forms.gle/zrCakugWRjredYq89" rel="noreferrer">
          https://forms.gle/zrCakugWRjredYq89
        </a>
        <p>
          위 설문까지 답변해 주신 분들 중 세 분을 추첨해
          <br />
          가장 많은 선택을 받은 <strong>치킨 기프티콘</strong>을 드립니다.
        </p>
      </div>
      <hr />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <Link href={`/s/${surveyId}`}>설문조사 첫 페이지로</Link>
        <Link href="/">설문이용 메인으로</Link>
      </div>
    </div>
  );
}
