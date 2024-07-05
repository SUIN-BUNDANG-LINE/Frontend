import Wrapper from '@/components/layout/Wrapper';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import styles from './customize.module.css';

interface Props {
  sort: string;
  setSortHandler: (value: string) => void;
  sortOptions: {
    value: string;
    label: string;
  }[];
}

function SurveyFinderCustomize({ sort, setSortHandler, sortOptions }: Props) {
  return (
    <Wrapper outerColor="#fff" zIndex={1}>
      <div className={styles.customize}>
        <div className={styles.sort}>
          <Dropdown options={sortOptions} onSelect={setSortHandler} defaultValue={sort} width="140px" />
        </div>
      </div>
    </Wrapper>
  );
}

export default SurveyFinderCustomize;
