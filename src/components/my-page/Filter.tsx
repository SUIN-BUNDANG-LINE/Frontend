import { StatusForFilter, SortType } from '@/services/my-page/types';
import styles from './Filter.module.css'; // 별도의 CSS 모듈을 사용할 수도 있습니다.

interface FilterProps {
  statusForFilter: StatusForFilter;
  sortType: SortType;
  onStatusChange: (status: StatusForFilter) => void;
  onSortChange: (sort: SortType) => void;
}

export default function Filter({ statusForFilter, sortType, onStatusChange, onSortChange }: FilterProps) {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value as StatusForFilter);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortType);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterItem}>
        <label className={styles.label} htmlFor="statusFilter">
          상태
          <select
            id="statusFilter"
            value={statusForFilter || ''}
            onChange={handleStatusChange}
            className={styles.select}>
            <option value="">전체</option>
            <option value="NOT_STARTED">제작 중</option>
            <option value="IN_PROGRESS">응답 받는 중</option>
            <option value="IN_MODIFICATION">수정 중</option>
            <option value="CLOSED">마감</option>
          </select>
        </label>
      </div>
      <div className={styles.filterItem}>
        <label className={styles.label} htmlFor="sortFilter">
          정렬
          <select id="sortFilter" value={sortType} onChange={handleSortChange} className={styles.select}>
            <option value="LAST_MODIFIED">최근 수정일 순</option>
            <option value="OLD_MODIFIED">오래된 수정일 순</option>
            <option value="TITLE_ASC">제목(A-Z)</option>
            <option value="TITLE_DESC">제목(Z-A)</option>
          </select>
        </label>
      </div>
    </div>
  );
}
