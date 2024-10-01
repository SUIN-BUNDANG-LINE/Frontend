import { FaX } from 'react-icons/fa6';
import styles from './reward-item.module.css';

export default function RewardItem({
  name,
  category,
  count,
  deleteHandler,
  editHandler,
}: {
  name: string;
  category: string;
  count: number;
  deleteHandler: () => void;
  editHandler: () => void;
}) {
  return (
    <div className={styles.rewardItem}>
      <button type="button" className={styles.rewardItemContent} onClick={editHandler}>
        <div className={styles.rewardItemLeft}>
          <div className={styles.rewardCategory}>{category}</div>
          <div className={styles.rewardName}>{name}</div>
        </div>
        <div className={styles.rewardCount}>x{count}</div>
      </button>
      <button type="button" aria-label="삭제" className={styles.rewardDelete} onClick={deleteHandler}>
        <FaX />
      </button>
    </div>
  );
}
