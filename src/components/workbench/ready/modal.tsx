import Button from '@/components/ui/button/Button';
import { ErrorDescriptor } from '../types';
import styles from './modal.module.css';

type Props = {
  errors: ErrorDescriptor[];
  rejectMessage: string;
  onClose: () => void;
};

export default function StartSurveyFailedModal({ errors, rejectMessage, onClose }: Props) {
  const getLocationString = (location: string[]) => {
    return location.join(' / ');
  };

  return (
    <div>
      {rejectMessage.length !== 0 && <div className={styles.rejectMessage}>⚠ {rejectMessage}</div>}
      {errors.length !== 0 && (
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={styles.errorItem}>
              {!error.location && <div className={styles.location}>기타 오류</div>}
              {error.location && <div className={styles.location}>{getLocationString(error.location)}</div>}
              <div>{error.reason}</div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.close}>
        <Button variant="primary" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
}
