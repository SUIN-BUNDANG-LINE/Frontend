import Wrapper from '@/components/layout/Wrapper';
import styles from './Farewell.module.css';

interface Props {
  message: string;
}

export default function Farewell({ message }: Props) {
  return (
    <Wrapper>
      <div className={styles.container}>
        <h1>응답 완료!</h1>
        <div className={styles.creator}>
          <div className={styles.title}>제작자의 메시지</div>
          <div className={styles.message}>{message}</div>
        </div>
        <div className={styles.submit}>제출하면 설문 참여가 완료됩니다.</div>
      </div>
    </Wrapper>
  );
}
