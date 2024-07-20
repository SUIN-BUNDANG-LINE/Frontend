import Button from '@/components/ui/button/Button';
import Wrapper from '@/components/layout/Wrapper';
import styles from './Navigator.module.css';

interface Props {
  isFirst: boolean;
  exit: () => void;
  moveBack: () => void;
  moveNext: () => void;
}

export default function Navigator({ isFirst, exit, moveBack, moveNext }: Props) {
  return (
    <Wrapper>
      <div className={styles.navigator}>
        {isFirst && (
          <Button variant="primary" onClick={exit}>
            처음으로
          </Button>
        )}
        {!isFirst && (
          <Button variant="primary" onClick={moveBack} width={72}>
            이전
          </Button>
        )}
        <Button variant="primary" onClick={moveNext} width={96}>
          다음
        </Button>
      </div>
    </Wrapper>
  );
}
