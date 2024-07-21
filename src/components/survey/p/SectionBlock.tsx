import Wrapper from '@/components/layout/Wrapper';
import { FaFileAlt } from 'react-icons/fa';
import styles from './SectionBlock.module.css';

interface Props {
  title: string;
  description?: string;
}

export default function SectionBlock({ title, description, children }: React.PropsWithChildren<Props>) {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <FaFileAlt />
          </div>
          <div className={styles.title_and_description}>
            <div className={styles.title}>{title}</div>
            {description && description.trim().length !== 0 && <div className={styles.description}>{description}</div>}
          </div>
        </div>
        {children}
      </div>
    </Wrapper>
  );
}
