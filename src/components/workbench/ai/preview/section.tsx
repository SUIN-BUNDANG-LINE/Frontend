/* eslint-disable react/destructuring-assignment */

import { Actions } from '../types/chat';
import { ChangeType, Section as S } from '../types/preview';
import styles from './section.module.css';

type Props = {
  index: string;
  oldSection: S | null;
  newSection?: S | null;
  changeType?: ChangeType;
  actions?: Actions;
};

export default function Section(props: Props) {
  const { index, oldSection, newSection, actions } = props;
  const changeType = props.changeType || 'UNCHANGED';

  function getPlaceholder() {
    const cname = `${styles.section} ${styles[changeType]}`;
    return <div className={cname} />;
  }

  function getSection(section: S, isNew: boolean) {
    const { title, description, sectionId } = section;
    const cname = `${styles.section} ${styles[changeType]}`;

    return (
      <button
        type="button"
        className={cname}
        onClick={() => {
          actions!.setBase(isNew);
          actions!.setTarget(sectionId);
        }}>
        <div className={styles.title}>{title || '제목 없는 섹션'}</div>
        <div className={styles.description}>{description}</div>
      </button>
    );
  }

  const gridTemplateColumns = `repeat(${typeof newSection !== 'undefined' ? 2 : 1}, 1fr)`;

  return (
    <div className={`${styles.container} ${styles[changeType]}`}>
      <div className={styles.heading}>
        <span>섹션 {index && index}</span>
      </div>
      <div className={styles.content} style={{ gridTemplateColumns }}>
        {oldSection ? getSection(oldSection, false) : getPlaceholder()}
        {typeof newSection !== 'undefined' && (newSection ? getSection(newSection, true) : getPlaceholder())}
      </div>
    </div>
  );
}
