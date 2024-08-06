import { MdError } from 'react-icons/md';
import styles from './Error.module.css';

interface Props {
  message: string;
  buttons?: { text: string; fn: () => void }[];
  margin?: string | number;
}

export default function Error({ message, buttons, margin }: Props) {
  let btns;

  if (buttons) {
    btns = (
      <div className={styles.buttons}>
        {buttons.map(({ text, fn }) => (
          <button type="button" key={text} onClick={fn} className={styles.button}>
            {text}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.error} style={{ margin }}>
      <div className={styles.title}>
        <MdError size={36} /> 에러
      </div>
      <div className={styles.message}>{message}</div>
      {btns && btns}
    </div>
  );
}
