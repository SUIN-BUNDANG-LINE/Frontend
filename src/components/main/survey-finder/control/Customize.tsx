import Wrapper from '@/components/layout/Wrapper';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Content from '@/components/ui/dropdown/Content';
import { useDropdown } from '@/hooks/useDropdown';
import { FaAngleDown } from 'react-icons/fa';
import styles from './Customize.module.css';

interface Props {
  sort: string;
  setSortHandler: (value: string) => void;
  sortOptions: {
    value: string;
    label: string;
  }[];
  filter: (boolean | undefined)[];
  setFilterHandler: (value: (boolean | undefined)[]) => void;
  filterOptions: {
    value: (boolean | undefined)[];
    label: string;
  }[];
}

export default function Customize({
  sort,
  setSortHandler,
  sortOptions,
  filter,
  setFilterHandler,
  filterOptions,
}: Props) {
  const { isOpen, fn, dropdownRef } = useDropdown();
  const { isOpen: filterIsOpen, fn: filterFn, dropdownRef: filterDropdownRef } = useDropdown();

  // 정렬 드롭다운 고정 콘텐츠
  const fixedContent = (
    <button type="button" className={styles.selector}>
      <span>{sortOptions.find((i) => i.value === sort)?.label}</span>
      <FaAngleDown className={`${styles.angle} ${isOpen ? styles.active : undefined}`} />
    </button>
  );

  const filterFixedContent = (
    <button type="button" className={styles.selector}>
      <span>{filterOptions.find((i) => i.value === filter)?.label}</span>
      <FaAngleDown className={`${styles.angle} ${isOpen ? styles.active : undefined}`} />
    </button>
  );

  // 정렬 옵션 콘텐츠
  const toggleContent = sortOptions.map(({ value, label }) => {
    return (
      <Content key={value} clickHandler={() => setSortHandler(value)}>
        <div className={styles.selectorItem}>{label}</div>
      </Content>
    );
  });

  // 필터 옵션 콘텐츠
  const filterToggleContent = filterOptions.map(({ value, label }) => {
    return (
      <Content key={label} clickHandler={() => setFilterHandler(value)}>
        <div className={styles.selectorItem}>{label}</div>
      </Content>
    );
  });

  return (
    <Wrapper outerColor="#fff" zIndex={1}>
      <div className={styles.customize}>
        {/* 정렬 드롭다운 */}
        <div className={styles.sort}>
          <Dropdown
            fixedContent={fixedContent}
            toggleContent={toggleContent}
            fn={fn}
            isOpen={isOpen}
            dropdownRef={dropdownRef}
            style={{ width: '172px', fontSize: '18px' }}
          />
        </div>

        {/* 필터 드롭다운 */}
        <div className={styles.filter}>
          <Dropdown
            fixedContent={filterFixedContent}
            toggleContent={filterToggleContent}
            fn={filterFn}
            isOpen={filterIsOpen}
            dropdownRef={filterDropdownRef}
            style={{ width: '172px', fontSize: '18px' }}
          />
        </div>
      </div>
    </Wrapper>
  );
}
