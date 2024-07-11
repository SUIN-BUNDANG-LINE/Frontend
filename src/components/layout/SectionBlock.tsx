import Wrapper from './Wrapper';
import styles from './SectionBlock.module.css';

interface Props {
  title: string;
}

export default function SectionBlock({ title, children }: React.PropsWithChildren<Props>) {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </Wrapper>
  );
}
