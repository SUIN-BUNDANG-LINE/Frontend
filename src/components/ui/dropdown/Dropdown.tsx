import styles from './Dropdown.module.css';

interface Props {
  fixedContent: React.ReactNode;
  toggleContent: React.ReactNode;
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  style: object;
}

export default function Dropdown({ fixedContent, toggleContent, isOpen, dropdownRef, style }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.fixedContent}>{fixedContent}</div>
      {isOpen && (
        <div className={styles.toggleContent} ref={dropdownRef} style={style}>
          {toggleContent}
        </div>
      )}
    </div>
  );
}
