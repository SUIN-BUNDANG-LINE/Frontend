/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import type { QuestionFilter, QuestionResultInfo } from '@/services/result/types';
import QuestionFilterComponent from '@/components/management/result/QuestionFilterComponent';

interface FilterManagerProps {
  onSearch: (filters: QuestionFilter[]) => void;
  resultInfo: QuestionResultInfo[];
}

export default function FilterManager({ onSearch, resultInfo }: FilterManagerProps) {
  const [tempFilters, setTempFilters] = useState<QuestionFilter[]>([]);

  const defaultQuestionFilter: QuestionFilter = {
    questionId: '',
    contents: [],
    isPositive: true,
  };

  const handleAddFilter = () => {
    setTempFilters((prev) => [...prev, { ...defaultQuestionFilter }]);
  };

  const handleRemoveFilter = (index: number) => {
    setTempFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFilterChange = (index: number, field: keyof QuestionFilter, value: any) => {
    const updatedFilters = tempFilters.map((filter, i) => (i === index ? { ...filter, [field]: value } : filter));
    setTempFilters(updatedFilters);
  };

  const handleSearch = () => {
    onSearch(tempFilters);
  };

  return (
    <div>
      {tempFilters.map((filter, index) => (
        <QuestionFilterComponent
          key={index}
          filter={filter}
          index={index}
          onFilterChange={handleFilterChange}
          onRemoveFilter={handleRemoveFilter}
          resultInfo={resultInfo}
        />
      ))}
      <button type="button" onClick={handleAddFilter}>
        필터 추가
      </button>
      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}
