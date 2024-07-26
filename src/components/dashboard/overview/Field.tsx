import Wrapper from '@/components/layout/Wrapper';
import styles from './Field.module.css';

interface Props {
  title: string;
}

export default function Field({ title, children }: React.PropsWithChildren<Props>) {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </Wrapper>
  );
}
