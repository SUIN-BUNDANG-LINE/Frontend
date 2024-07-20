import { useRef } from 'react';
import type { ResponseDispatcher } from '../../types/interaction';
import styles from './Option.module.css';

interface Props {
  type: 'RADIO' | 'CHECKBOX';
  label: string | null;
  active: boolean;
  dispatcher: ResponseDispatcher;
  content?: string;
  others?: true;
}

export default function Option({ type, label, active, dispatcher, content, others }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleOption = () => {
    dispatcher.toggleOption(label, type === 'RADIO');
  };

  if (!others) {
    return (
      <button type="button" className={styles.option} onMouseDown={toggleOption}>
        <div className={styles.indicator}>
          {type === 'RADIO' && <div className={`${styles.radio} ${active ? styles.active : ''}`} />}
          {type === 'CHECKBOX' && <div className={`${styles.checkbox} ${active ? styles.active : ''}`} />}
        </div>
        <div>{label}</div>
      </button>
    );
  }

  const clickButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!active) inputRef.current?.focus();
    dispatcher.toggleOption(null, type === 'RADIO');
  };

  const clickInputHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!active) dispatcher.setOption(null, type === 'RADIO');
  };

  const setContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatcher.setContent(e.target.value);
  };

  return (
    <button type="button" className={styles.option} onMouseDown={clickButtonHandler}>
      <div className={styles.indicator}>
        {type === 'RADIO' && <div className={`${styles.radio} ${active ? styles.active : ''}`} />}
        {type === 'CHECKBOX' && <div className={`${styles.checkbox} ${active ? styles.active : ''}`} />}
      </div>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="기타..."
        value={content}
        onChange={setContent}
        onMouseDown={clickInputHandler}
      />
    </button>
  );
}
