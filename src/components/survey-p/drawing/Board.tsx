import type { Dispatch, SetStateAction } from 'react';
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
  const ticketMapper = ({ gone, id }: { gone: boolean; id: number }) => {
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
  };

  return (
    <>
      <div className={styles.selectedDisplay}>
        {selected === null ? '추첨권을 선택해주세요.' : `${selected + 1}번 추첨권을 선택하셨습니다.`}
      </div>
      <div className={styles.board}>{tickets.map(ticketMapper)}</div>
    </>
  );
}
