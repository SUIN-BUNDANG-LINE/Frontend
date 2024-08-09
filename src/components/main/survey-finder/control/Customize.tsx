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
}

export default function Customize({ sort, setSortHandler, sortOptions }: Props) {
  const { isOpen, fn, dropdownRef } = useDropdown();

  const fixedContent = (
    <button type="button" className={styles.selector}>
      <span>{sortOptions.find((i) => i.value === sort)?.label}</span>
      <FaAngleDown className={`${styles.angle} ${isOpen ? styles.active : undefined}`} />
    </button>
  );

  const toggleContent = sortOptions.map(({ value, label }) => {
    return (
      <Content key={value} clickHandler={() => setSortHandler(value)}>
        <div className={styles.selectorItem}>{label}</div>
      </Content>
    );
  });

  return (
    <Wrapper outerColor="#fff" zIndex={1}>
      <div className={styles.customize}>
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
      </div>
    </Wrapper>
  );
}
