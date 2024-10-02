import { FaFileAlt } from 'react-icons/fa';
import React from 'react';
import styles from './Section.module.css';

type Props = {
  title: string;
  description: string;
};

export default function Section({ title, description, children }: React.PropsWithChildren<Props>) {
  return (
    <div className={styles.section}>
      <div className={styles.heads}>
        <div className={styles.top}>
          <FaFileAlt size="24px" />
          <div className={styles.title}>{title || '제목 없는 섹션'}</div>
        </div>
        {description.length !== 0 && <div className={styles.bottom}>{description}</div>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
