import { FaX } from 'react-icons/fa6';
import styles from './reward-item.module.css';

export default function RewardItem({
  name,
  category,
  count,
  deleteHandler,
  editHandler,
  readonly,
}: {
  name: string;
  category: string;
  count: number;
  deleteHandler: () => void;
  editHandler: () => void;
  readonly: boolean;
}) {
  return (
    <div className={styles.rewardItem}>
      <button type="button" className={styles.rewardItemContent} onClick={editHandler} disabled={readonly}>
        <div className={styles.rewardItemLeft}>
          <div className={styles.rewardCategory}>{category}</div>
          <div className={styles.rewardName}>{name}</div>
        </div>
        <div className={styles.rewardCount}>x{count}</div>
      </button>
      <button
        type="button"
        aria-label="삭제"
        className={styles.rewardDelete}
        onClick={deleteHandler}
        disabled={readonly}>
        <FaX />
      </button>
    </div>
  );
}
