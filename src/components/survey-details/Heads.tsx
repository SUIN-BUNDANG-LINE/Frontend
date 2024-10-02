import Image from 'next/image';
import { FaCopy } from 'react-icons/fa';
import React from 'react';
import { writeClipboard } from '@/utils/misc';
import { showToast } from '@/utils/toast';
import styles from './Heads.module.css';

interface Props {
  title: string;
  description: string;
  thumbnail: string | null;
}

export default function Heads({ title, description, thumbnail }: Props) {
  const resize = () => {
    const textarea = document.getElementById('description');
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  React.useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const copyUrl = () => {
    writeClipboard(window.location.href);
    showToast('success', '클립보드에 URL이 복사되었습니다!');
  };

  return (
    <div className={styles.heads}>
      <Image
        className={styles.thumbnail}
        src={thumbnail || '/assets/default-thumbnail.webp'}
        alt="thumbnail"
        width={220}
        height={220}
      />
      <h2 className={styles.title}>{title}</h2>
      {description?.length > 0 && (
        <textarea id="description" className={styles.description} value={description} readOnly />
      )}
      <button type="button" className={styles.shareButton} onClick={() => copyUrl()}>
        <FaCopy /> URL 복사
      </button>
    </div>
  );
}
