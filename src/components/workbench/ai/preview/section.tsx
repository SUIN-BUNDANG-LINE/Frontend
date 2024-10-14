/* eslint-disable react/destructuring-assignment */

import { ChangeType, Section as S } from '../types/preview';
import styles from './section.module.css';

type Props = {
  index: string;
  oldSection?: S;
  newSection: S;
  changeType?: ChangeType;
};

export default function Section(props: Props) {
  const { index, oldSection, newSection } = props;
  const changeType = props.changeType || 'UNCHANGED';

  function getSection(section: S) {
    const { title, description } = section;
    const cname = `${styles.section} ${styles[changeType]}`;

    return (
      <button type="button" className={cname}>
        <div className={styles.title}>{title || '제목 없는 섹션'}</div>
        <div className={styles.description}>{description}</div>
      </button>
    );
  }

  const gridTemplateColumns = `repeat(${oldSection ? 2 : 1}, 1fr)`;

  return (
    <div className={`${styles.container} ${styles[changeType]}`}>
      <div className={styles.heading}>
        <span>섹션 {index && index}</span>
      </div>
      <div className={styles.content} style={{ gridTemplateColumns }}>
        {oldSection && getSection(oldSection)}
        {getSection(newSection)}
      </div>
    </div>
  );
}
