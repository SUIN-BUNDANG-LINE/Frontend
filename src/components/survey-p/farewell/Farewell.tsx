import Wrapper from '@/components/layout/Wrapper';
import styles from './Farewell.module.css';

interface Props {
  message: string;
}

export default function Farewell({ message }: Props) {
  return (
    <Wrapper>
      <div className={styles.container}>
        <h1>설문 참여 완료!</h1>
        <div>제작자의 메시지</div>
        <p className={styles.message}>
          <span>{message}</span>
        </p>
      </div>
    </Wrapper>
  );
}
