import { Store } from '@/components/workbench/types';
import { statusReader } from '@/utils/enumReader';
import styles from './index.module.css';
import Heads from './Heads';
import Body from './Body';

interface Props {
  title: string;
  description: string;
  status: Store['status'];
  thumbnail: string | null;
  rewardConfig: Store['rewardConfig'];
  onStart: () => void;
}

export default function PreviewDetails({ title, description, status, thumbnail, rewardConfig, onStart }: Props) {
  return (
    <div className={styles.wrapper}>
      <Heads title={title} description={description} thumbnail={thumbnail} />
      <Body status={statusReader(status)} rewardConfig={rewardConfig} onStart={onStart} />
    </div>
  );
}
