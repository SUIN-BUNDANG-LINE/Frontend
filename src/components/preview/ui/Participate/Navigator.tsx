import Button from '@/components/ui/button/Button';
import { Section } from '@/components/workbench/types';
import styles from './Navigator.module.css';

type Props = { stack: Section[]; push: () => void; pop: () => void };

export default function Navigator({ stack, push, pop }: Props) {
  return (
    <div className={styles.navigator}>
      <div className={styles.buttons}>
        <Button variant="primary" width="96px" onClick={pop}>
          {stack.length === 1 ? '처음으로' : '이전'}
        </Button>
        <Button variant="primary" width="96px" onClick={push}>
          다음
        </Button>
      </div>
    </div>
  );
}
