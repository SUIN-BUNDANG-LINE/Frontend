import { Response } from '@/services/result/types';
import styles from './TextResponseList.module.css';

export default function TextResponseList({ responses }: { responses: Response[] }) {
  return (
    <div className={styles.textResponseContainer}>
      {responses.map((response: Response, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className={styles.textResponseItem}>
          {response.content}
        </div>
      ))}
    </div>
  );
}
