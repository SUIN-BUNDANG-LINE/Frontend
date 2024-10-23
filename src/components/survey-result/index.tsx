import Link from 'next/link';
import styles from './index.module.css';

interface Props {
  surveyId: string;
  reward: string | null;
  until: string | null;
}

export default function SurveyResult({ surveyId, reward, until }: Props) {
  if (!reward || !until) {
    return (
      <div className={styles.container}>
        <h3>추첨 결과</h3>
        <div className={styles.reward}>😥 아쉽게도 낙첨되셨습니다.</div>
        <div className={styles.buttons}>
          <Link href={`/s/${surveyId}`}>설문조사 첫 페이지로 →</Link>
          <Link href="/">설문이용 메인으로 →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3>추첨 결과</h3>
      <div className={styles.reward}>
        🎉 <span className={styles.rewardName}>{reward}</span>에 당첨되셨습니다!
      </div>
      <div className={styles.until}>
        📅 <span className={styles.date}>{until}</span> 설문을 마감한 뒤 리워드를 지급할 예정입니다.
      </div>
      <div className={styles.buttons}>
        <Link href={`/s/${surveyId}`}>설문조사 첫 페이지로 →</Link>
        <Link href="/">설문이용 메인으로 →</Link>
      </div>
    </div>
  );
}
