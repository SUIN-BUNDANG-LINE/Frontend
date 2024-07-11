import styles from './Table.module.css';

interface Props<T> {
  gridTemplateColumns: string;
  columnNames: string[];
  data: T[];
  dataMapper: (arg: T) => React.ReactNode;
  emptyMessage: string;
}

export default function OverviewTable<T>({
  columnNames,
  gridTemplateColumns,
  data,
  dataMapper,
  emptyMessage,
}: Props<T>) {
  return (
    <div className={styles.container}>
      {data.length === 0 ? (
        <div>{emptyMessage}</div>
      ) : (
        <>
          <div className={styles.header} style={{ gridTemplateColumns }}>
            {columnNames.map((name) => (
              <div key={name}>{name}</div>
            ))}
          </div>
          <div className={styles.rows}>
            {data.map((a) => (
              <div className={styles.row} key={undefined || Math.random()} style={{ gridTemplateColumns }}>
                {dataMapper(a)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
