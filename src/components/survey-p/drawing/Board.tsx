import { useCallback, useMemo, type Dispatch, type SetStateAction } from 'react';
import styles from './Board.module.css';

interface Props {
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  tickets: {
    gone: boolean;
    id: number;
  }[];
}

export default function Board({ selected, setSelected, tickets }: Props) {
  const ticketMapper = useCallback(
    (ticket: { gone: boolean; id: number }) => {
      const { gone, id } = ticket;
      const className = [styles.ticket, gone ? styles.gone : undefined, selected === id ? styles.selected : undefined]
        .filter((i) => !!i)
        .join(' ');

      const onClick = gone ? () => {} : () => setSelected(id);

      return (
        <button type="button" key={id} className={className} onClick={onClick}>
          <div className={styles.ticketOverlay}>
            <div className={styles.ticketContent}>{id + 1}</div>
          </div>
        </button>
      );
    },
    [selected, setSelected]
  );

  const ticketRows = useMemo(() => {
    const res: JSX.Element[][] = [];
    const mappedTickets = tickets.map(ticketMapper);

    const cols = Math.max(10, Math.ceil(tickets.length / 4));
    for (let i = 0; i < Math.ceil(tickets.length / cols); i += 1) {
      res.push(mappedTickets.slice(i * cols, i * cols + cols));
    }
    return res;
  }, [ticketMapper, tickets]);

  return (
    <>
      <div className={styles.selectedDisplay}>
        {selected === null ? '추첨권을 선택해주세요.' : `${selected + 1}번 추첨권을 선택하셨습니다.`}
      </div>
      <div className={styles.board}>
        {ticketRows.map((i) => (
          <div key={i[0].key} className={styles.boardInner}>
            {i}
          </div>
        ))}
      </div>
      <div className={styles.tip}>* 스크롤하면 더 많은 추첨권이 보입니다.</div>
    </>
  );
}
