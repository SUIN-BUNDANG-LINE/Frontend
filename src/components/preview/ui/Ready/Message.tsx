import React from 'react';
import { FaRegSmile } from 'react-icons/fa';
import styles from './Message.module.css';

export default function Message({ message }: { message: string }) {
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
    <div className={styles.container}>
      <div className={styles.from}>
        <FaRegSmile /> 제작자의 메시지
      </div>
      <textarea id="textarea" className={styles.message} value={message} readOnly />
    </div>
  );
}
