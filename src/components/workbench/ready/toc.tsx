import Svg from '../misc/Svg';
import { Section, Field } from '../types';
import styles from './toc.module.css';

const svgPaths = {
  text: 'M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z',
  radio:
    'M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  checkbox:
    'm424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z',
};

export default function Toc({
  toc,
}: {
  toc: {
    section: Section;
    fields: Field[];
  }[];
}) {
  const totalSections = toc.length;
  const totalFields = toc.reduce((acc, curr) => acc + curr.fields.length, 0);

  const icon = (type: Field['type']) => {
    return <Svg path={svgPaths[type]} size="18px" />;
  };

  return (
    <div className={styles.tocContainer}>
      <div className={styles.summary}>
        <strong>목차 / </strong>
        <span>
          총 섹션 {totalSections}개, 질문 {totalFields}개
        </span>
      </div>
      {toc.map(({ section, fields }) => (
        <div key={section.sectionId} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title || '제목 없는 섹션'}</h2>
          <ul className={styles.fieldList}>
            {fields.map((field) => (
              <li key={field.fieldId} className={styles.fieldItem}>
                {icon(field.type)} {field.title || '제목 없는 질문'}{' '}
                {field.required && <span style={{ color: 'red' }}>*</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
