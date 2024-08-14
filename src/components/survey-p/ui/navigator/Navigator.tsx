import Button from '@/components/ui/button/Button';
import Wrapper from '@/components/layout/Wrapper';
import styles from './Navigator.module.css';

interface Props {
  backAction: () => void;
  nextAction: () => void;
  backText: string;
  nextText: string;
  disablePrev?: boolean;
  disableNext?: boolean;
  centered?: true;
}

export default function Navigator({
  backAction,
  nextAction,
  backText,
  nextText,
  disablePrev,
  disableNext,
  centered,
}: Props) {
  return (
    <Wrapper>
      <div className={`${styles.navigator} ${centered ? styles.centered : ''}`}>
        <Button variant="primary" onClick={backAction} width={96} disabled={disablePrev || false}>
          {backText}
        </Button>
        <Button variant="primary" onClick={nextAction} width={96} disabled={disableNext || false}>
          {nextText}
        </Button>
      </div>
    </Wrapper>
  );
}
