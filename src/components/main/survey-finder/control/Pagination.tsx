import Wrapper from '@/components/layout/Wrapper';
import styles from './pagination.module.css';

interface Props {
  page: number;
  setPageHandler: (value: number) => void;
  maxPage: number;
}

function SurveyFinderPagination({ page, setPageHandler, maxPage }: Props) {
  const increment = () => {
    setPageHandler(page + 1);
  };

  const decrement = () => {
    setPageHandler(page - 1);
  };

  return (
    <Wrapper outerColor="var(--gray-l)">
      <div className={styles.pagination}>
        <div>
          <button type="button" className={styles.button} onClick={decrement} disabled={page === 1}>
            &lt;
          </button>
          <div className={styles.indicator}>
            <span>{page}</span>
            <span>/ {maxPage}</span>
          </div>
          <button type="button" className={styles.button} onClick={increment} disabled={page === maxPage}>
            &gt;
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default SurveyFinderPagination;
