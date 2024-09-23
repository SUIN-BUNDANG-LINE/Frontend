import React, { useState } from 'react';
import type { QuestionFilter, QuestionResultInfo } from '@/services/result/types';
import QuestionFilterComponent from '@/components/management/result/QuestionFilterComponent';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { showToast } from '@/utils/toast'; // Import the showToast function
import styles from './FilterManager.module.css';

interface FilterManagerProps {
  onSearch: (filters: QuestionFilter[]) => void;
  resultInfo: QuestionResultInfo[];
}

export default function FilterManager({ onSearch, resultInfo }: FilterManagerProps) {
  const [tempFilters, setTempFilters] = useState<QuestionFilter[]>([]);
  const [invalidFilterIndexes, setInvalidFilterIndexes] = useState<number[]>([]);

  const defaultQuestionFilter: QuestionFilter = {
    questionId: '',
    contents: [],
    isPositive: true,
  };

  const handleAddFilter = () => {
    if (tempFilters.length >= 20) {
      showToast('error', '필터는 20개까지 추가할 수 있습니다.');
      return;
    }

    setTempFilters((prev) => [...prev, { ...defaultQuestionFilter }]);
  };

  const handleRemoveFilter = (index: number) => {
    setTempFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFilterChange = (index: number, field: keyof QuestionFilter, value: string | boolean | string[]) => {
    setTempFilters((prev) => {
      const updatedFilters = prev.map((filter, i) => {
        if (i === index) {
          if (field === 'questionId' && filter.questionId !== value) {
            return { ...filter, questionId: value as string, contents: [] };
          }
          return { ...filter, [field]: value };
        }
        return filter;
      });
      return updatedFilters;
    });
  };

  const validateFilters = () => {
    return tempFilters
      .map((filter, index) => (!filter.questionId || filter.contents.length === 0 ? index : -1))
      .filter((index) => index !== -1);
  };

  const handleSearch = () => {
    const invalidIndexes = validateFilters();
    if (invalidIndexes.length > 0) {
      setInvalidFilterIndexes(invalidIndexes);
      showToast('error', '필터의 내용을 채워주세요.');
      setTimeout(() => {
        setInvalidFilterIndexes([]);
      }, 500);
    } else {
      onSearch(tempFilters);
    }
  };

  return (
    <div className={styles.filterManagerContainer}>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={handleAddFilter} className={styles.addButton}>
          <FaPlus className={styles.buttonIcon} /> 필터 추가
        </button>
        <button type="button" onClick={handleSearch} className={styles.searchButton}>
          <FaSearch className={styles.buttonIcon} /> 검색
        </button>
      </div>
      {tempFilters.map((filter, index) => (
        <QuestionFilterComponent
          key={filter.questionId}
          filter={filter}
          index={index}
          onFilterChange={handleFilterChange}
          onRemoveFilter={handleRemoveFilter}
          resultInfo={resultInfo}
          isInvalid={invalidFilterIndexes.includes(index)}
        />
      ))}
    </div>
  );
}
