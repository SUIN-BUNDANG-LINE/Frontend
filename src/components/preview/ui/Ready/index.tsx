import Button from '@/components/ui/button/Button';
import { FaPen, FaRocket } from 'react-icons/fa';
import styles from './index.module.css';
import Message from './Message';

type Props = {
  message: string;
  pop: () => void;
  submitHandler: () => void;
};

export default function ReadyToSubmit({ message, pop, submitHandler }: Props) {
  return (
    <div className={styles.wrapper}>
      <h2>제출할 준비가 되었습니다!</h2>
      <Message message={message} />
      <div className={styles.submitArea}>
        <Button
          onClick={submitHandler}
          variant="primary"
          width="140px"
          height="48px"
          style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaRocket />
          <span>제출하기</span>
        </Button>
        <button type="button" className={styles.back} onClick={pop}>
          <FaPen />
          <span>응답 수정하기</span>
        </button>
      </div>
    </div>
  );
}
