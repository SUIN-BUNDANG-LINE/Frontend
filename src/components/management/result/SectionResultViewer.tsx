import { useState } from 'react';
import { QuestionResult, SectionResult } from '@/services/result/types';
import QuestionResultViewer from './QuestionResultViewer';
import styles from './SectionResultViewer.module.css';

export default function SectionResultViewer({ sectionResult }: { sectionResult: SectionResult }) {
  const { title, questionResults } = sectionResult;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>{title}</div>
        <button type="button" className={styles.collapseButton} onClick={toggleCollapse}>
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>
      {!isCollapsed && (
        <div className={styles.questionResults}>
          {questionResults.map((questionResult: QuestionResult) => (
            <QuestionResultViewer key={questionResult.questionId} questionResult={questionResult} />
          ))}
        </div>
      )}
    </div>
  );
}
