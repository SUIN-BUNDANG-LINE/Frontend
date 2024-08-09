import styles from './Dropdown.module.css';

interface Props {
  fixedContent: React.ReactNode;
  toggleContent: React.ReactNode;
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  fn: {
    openDropdown: () => void;
    closeDropdown: () => void;
  };
  style?: object;
}

export default function Dropdown({ fixedContent, toggleContent, dropdownRef, isOpen, fn, style }: Props) {
  return (
    <div className={styles.container} ref={dropdownRef}>
      <div
        className={styles.fixedContent}
        onClick={isOpen ? fn.closeDropdown : fn.openDropdown}
        onKeyDown={isOpen ? fn.closeDropdown : fn.openDropdown}
        role="button"
        tabIndex={0}>
        {fixedContent}
      </div>
      {isOpen && (
        <div
          className={styles.toggleContent}
          onClick={fn.closeDropdown}
          onKeyDown={fn.closeDropdown}
          role="button"
          tabIndex={0}
          style={style}>
          {toggleContent}
        </div>
      )}
    </div>
  );
}
