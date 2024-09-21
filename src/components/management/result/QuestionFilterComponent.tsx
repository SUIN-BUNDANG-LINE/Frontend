/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { QuestionFilter, QuestionResultInfo } from '@/services/result/types';

interface QuestionFilterComponentProps {
  filter: QuestionFilter;
  index: number;
  onFilterChange: (index: number, field: keyof QuestionFilter, value: any) => void;
  onRemoveFilter: (index: number) => void;
  resultInfo: QuestionResultInfo[];
}

export default function QuestionFilterComponent({
  filter,
  index,
  onFilterChange,
  onRemoveFilter,
  resultInfo,
}: QuestionFilterComponentProps) {
  // 선택된 질문 정보 찾기
  const selectedQuestion = resultInfo.find((info) => info.id === filter.questionId);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <label>
        질문 선택:
        <select value={filter.questionId} onChange={(e) => onFilterChange(index, 'questionId', e.target.value)}>
          <option value="" disabled>
            질문을 선택하세요
          </option>
          {resultInfo.map((info) => (
            <option key={info.id} value={info.id}>
              {info.title}
            </option>
          ))}
        </select>
      </label>

      {selectedQuestion && (
        <div>
          <label>필터할 내용:</label>
          <div>
            {selectedQuestion.contents.map((content, contentIndex) => (
              <div key={contentIndex}>
                <input
                  type="checkbox"
                  checked={filter.contents.includes(content)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // 체크박스가 체크되었을 때
                      onFilterChange(index, 'contents', [...filter.contents, content]);
                    } else {
                      // 체크박스가 체크 해제되었을 때
                      onFilterChange(
                        index,
                        'contents',
                        filter.contents.filter((c) => c !== content)
                      );
                    }
                  }}
                />
                {content}
              </div>
            ))}
          </div>
        </div>
      )}

      <label>
        긍정 필터 여부:
        <select
          value={filter.isPositive ? 'true' : 'false'}
          onChange={(e) => onFilterChange(index, 'isPositive', e.target.value === 'true')}>
          <option value="true">포함</option>
          <option value="false">제외</option>
        </select>
      </label>

      <button type="button" onClick={() => onRemoveFilter(index)}>
        필터 삭제
      </button>
    </div>
  );
}
