import { QuestionResult } from '@/services/result/types';
import { FaAlignJustify, FaCheckSquare, FaFont, FaUsers } from 'react-icons/fa';
import styles from './QuestionResultViewer.module.css';
import PieChartComponent from './PieChartComponent';
import TextResponseList from './TextResponseList';

export default function QuestionResultViewer({ questionResult }: { questionResult: QuestionResult }) {
  const { title, responses, participantCount, type } = questionResult;

  const questionTypeMap: { [key: string]: { label: string; icon: JSX.Element } } = {
    SINGLE_CHOICE: { label: '단일 선택', icon: <FaCheckSquare color="#5b5b5b" /> },
    MULTIPLE_CHOICE: { label: '다중 선택', icon: <FaAlignJustify color="#5b5b5b" /> },
    TEXT_RESPONSE: { label: '주관식', icon: <FaFont color="#5b5b5b" /> },
  };

  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.questionTitle}>{title}</h2>
      <div className={styles.questionInfo}>
        <div className={styles.questionType}>
          {/* 타입 아이콘 */}
          <span className={styles.icon}>{questionTypeMap[type].icon}</span>
          <span className={styles.typeSpan}>{questionTypeMap[type].label}</span>
        </div>
        <div className={styles.participantCount}>
          {/* 응답자 수 아이콘 */}
          <span className={styles.icon}>
            <FaUsers />
          </span>
          <span className={styles.typeSpan}>{participantCount}명</span>
        </div>
      </div>
      {type === 'TEXT_RESPONSE' ? (
        <TextResponseList responses={responses} />
      ) : (
        <PieChartComponent responses={responses} />
      )}
    </div>
  );
}
