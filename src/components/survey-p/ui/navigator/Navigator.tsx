import Button from '@/components/ui/button/Button';
import Wrapper from '@/components/layout/Wrapper';
import styles from './Navigator.module.css';

interface Props {
  backAction: () => void;
  nextAction: () => void;
  backText: string;
  nextText: string;
  centered?: true;
}

export default function Navigator({ backAction, nextAction, backText, nextText, centered }: Props) {
  return (
    <Wrapper>
      <div className={`${styles.navigator} ${centered ? styles.centered : ''}`}>
        <Button variant="primary" onClick={backAction} width={96}>
          {backText}
        </Button>
        <Button variant="primary" onClick={nextAction} width={96}>
          {nextText}
        </Button>
      </div>
    </Wrapper>
  );
}
