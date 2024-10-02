import Image from 'next/image';
import { FaCopy } from 'react-icons/fa';
import React from 'react';
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
      <textarea id="description" className={styles.description} value={description} readOnly />
      <div className={styles.share}>
        <div className={styles.shareContent}>
          <FaCopy />
          <span>URL 복사</span>
        </div>
      </div>
    </div>
  );
}
