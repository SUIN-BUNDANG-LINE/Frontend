import Image from 'next/image';
import { FaCopy } from 'react-icons/fa';
import styles from './Heads.module.css';

interface Props {
  title: string;
  description: string;
  thumbnail: string | null;
}

export default function Heads({ title, description, thumbnail }: Props) {
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
      <div className={styles.description}>{description}</div>
      <div className={styles.share}>
        <div className={styles.shareContent}>
          <FaCopy />
          <span>URL 복사</span>
        </div>
      </div>
    </div>
  );
}
