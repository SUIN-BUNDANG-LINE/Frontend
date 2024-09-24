import { FaSave, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { ErrorDescriptor } from '../types';
import styles from './submit.module.css';

type Props = { errors: ErrorDescriptor[]; handleSubmit: () => void; isPending: boolean; surveyId: string };

export default function Submit({ errors, handleSubmit, isPending, surveyId }: Props) {
  const error = errors.length !== 0;

  return (
    <div className={styles.right}>
      <button
        type="button"
        className={`${styles.button} ${error ? styles.error : ''}`}
        onClick={handleSubmit}
        disabled={isPending}>
        {error && (
          <>
            <div>저장 불가</div>
            <div>사유 보기</div>
          </>
        )}
        {!error && (
          <div className={styles.content}>
            <FaSave />
            {isPending ? '저장 중...' : '저장'}
          </div>
        )}
      </button>
      <Link href={`/workbench/${surveyId}/preview`} className={styles.preview}>
        <FaExternalLinkAlt />
        <div>미리보기</div>
      </Link>
    </div>
  );
}
