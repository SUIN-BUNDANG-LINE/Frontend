import styles from './error-item.module.css';

type Props = {
  location?: string[];
  reason: string;
};

export default function ErrorItem({ reason, location }: Props) {
  const locationString = location?.map((i) => (i.length > 10 ? `${i.slice(0, 10)}...` : i)).join(' / ') || '기타 사유';

  return (
    <div className={styles.container}>
      <div className={styles.location}>{locationString}</div>
      <div className={styles.reason}>{reason}</div>
    </div>
  );
}
