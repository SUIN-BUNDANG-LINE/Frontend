import React from 'react';
import type { QuestionFilter, QuestionResultInfo } from '@/services/result/types';
import { FaTimes } from 'react-icons/fa';
import styles from './QuestionFilterComponent.module.css';

interface QuestionFilterComponentProps {
  filter: QuestionFilter;
  index: number;
  onFilterChange: (index: number, field: keyof QuestionFilter, value: string | boolean | string[]) => void;
  onRemoveFilter: (index: number) => void;
  resultInfo: QuestionResultInfo[];
  isInvalid: boolean;
}

export default function QuestionFilterComponent({
  filter,
  index,
  onFilterChange,
  onRemoveFilter,
  resultInfo,
  isInvalid,
}: QuestionFilterComponentProps) {
  const selectedQuestion = resultInfo.find((info) => info.id === filter.questionId);

  return (
    <div className={`${styles.filterContainer} ${isInvalid ? styles.invalidFilter : ''}`}>
      <button
        type="button"
        aria-label="필터 삭제"
        className={styles.removeButton}
        onClick={() => onRemoveFilter(index)}>
        <FaTimes />
      </button>

      <div className={styles.field}>
        {index > 0 && <span className={styles.inlineLabel}>그리고</span>}
        <select
          id={`question-select-${index}`}
          className={`${styles.select} ${index > 0 ? styles.selectExtended : ''}`}
          value={filter.questionId}
          onChange={(e) => onFilterChange(index, 'questionId', e.target.value)}>
          <option value="" disabled>
            질문을 선택하세요
          </option>
          {resultInfo.map((info) => (
            <option key={info.id} value={info.id}>
              {info.title}
            </option>
          ))}
        </select>
        <span className={styles.inlineLabel}>에</span>
      </div>

      <div className={styles.field}>
        <div className={styles.contentButtonContainer}>
          {selectedQuestion ? (
            selectedQuestion.contents.map((content, idx) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={`${styles.contentButton} ${
                  filter.contents.includes(content) ? styles.selectedContentButton : ''
                }`}
                onClick={() =>
                  onFilterChange(
                    index,
                    'contents',
                    filter.contents.includes(content)
                      ? filter.contents.filter((c) => c !== content)
                      : [...filter.contents, content]
                  )
                }
                title={content}
                type="button">
                {content}
              </button>
            ))
          ) : (
            <div className={styles.placeholderText}>질문을 먼저 선택해주세요.</div>
          )}
        </div>
      </div>

      {selectedQuestion && (
        <div className={styles.field}>
          <span className={styles.inlineLabel}>중 하나 이상</span>
          <label htmlFor={`toggle-${index}`} className={styles.toggleSwitch}>
            <input
              id={`toggle-${index}`}
              type="checkbox"
              checked={filter.isPositive}
              onChange={() => onFilterChange(index, 'isPositive', !filter.isPositive)}
              aria-label="긍정 필터 여부 토글"
            />
            <div className={styles.switchSlider}>
              <span className={styles.switchLabelLeft}>선택하지 않은</span>
              <span className={styles.switchLabelRight}>선택한</span>
            </div>
          </label>
          <span className={styles.inlineLabel}>참가자의 응답 보기</span>
        </div>
      )}
    </div>
  );
}
