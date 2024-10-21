import React from 'react';
import { FaRegSmile } from 'react-icons/fa';
import Button from '@/components/ui/button/Button';
import { FaPen, FaRocket } from 'react-icons/fa6';
import styles from './Farewell.module.css';

type Props = {
  message: string;
  disabled: boolean;
  next: () => void;
  back: () => void;
};

export default function Message({ message, next, back, disabled }: Props) {
  const resize = () => {
    const textarea = document.getElementById('textarea');
    if (!textarea) return;
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  };

  React.useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>제출할 준비가 되었습니다!</h2>
      {message.length !== 0 && (
        <div className={styles.container}>
          <div className={styles.from}>
            <FaRegSmile /> 제작자의 메시지
          </div>
          <textarea id="textarea" className={styles.message} value={message} readOnly />
        </div>
      )}
      <div className={styles.submitArea}>
        <Button
          onClick={next}
          variant="primary"
          width="140px"
          height="48px"
          disabled={disabled}
          style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaRocket />
          <span>제출하기</span>
        </Button>
        <button onClick={back} type="button" className={styles.back} disabled={disabled}>
          <FaPen />
          <span>응답 수정하기</span>
        </button>
      </div>
    </div>
  );
}
