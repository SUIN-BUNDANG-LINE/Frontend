import Link from 'next/link';
import Wrapper from '../layout/Wrapper';
import styles from './index.module.css';

interface Props {
  surveyId: string;
  reward: string | null;
}

export default function SurveyResult({ surveyId, reward }: Props) {
  return (
    <Wrapper>
      <div className={styles.container}>
        {!reward && <div>아쉽게도 낙첨되셨습니다.</div>}
        {reward && <div>{reward} 당첨!</div>}
        <hr />
        <Link href={`/s/${surveyId}`}>설문조사 첫 페이지로</Link>
        <Link href="/">설문이용 메인으로</Link>
      </div>
    </Wrapper>
  );
}
