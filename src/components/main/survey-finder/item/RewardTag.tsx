import Tooltip from '@/components/ui/tooltip/Tooltip';
import { Reward } from '../types';
import styles from './RewardTag.module.css';

function RewardTag({ reward }: { reward: Reward }) {
  const { category, items } = reward;

  return (
    <Tooltip text={items.join(', ')}>
      <div className={styles.reward}>{category}</div>
    </Tooltip>
  );
}

export default RewardTag;
