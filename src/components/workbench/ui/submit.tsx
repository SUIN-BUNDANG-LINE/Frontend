import { FaSave, FaExternalLinkAlt } from 'react-icons/fa';
import { ErrorDescriptor } from '../types';
import styles from './submit.module.css';

export default function Submit({ errors, handleSubmit }: { errors: ErrorDescriptor[]; handleSubmit: () => void }) {
  const error = errors.length !== 0;

  return (
    <div className={styles.right}>
      <button type="button" className={`${styles.button} ${error ? styles.error : ''}`} onClick={handleSubmit}>
        {error && (
          <>
            <div>저장 불가</div>
            <div>사유 보기</div>
          </>
        )}
        {!error && (
          <div className={styles.content}>
            <FaSave />
            수동 저장
          </div>
        )}
      </button>
      <div className={styles.preview}>
        <FaExternalLinkAlt />
        <div>미리보기</div>
      </div>
    </div>
  );
}
