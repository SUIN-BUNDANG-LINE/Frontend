import React from 'react';
import styles from './generating.module.css';

type Props = {
  abort: () => void;
};

export default function Generating({ abort }: Props) {
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((pre) => pre + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>설문지를 생성하는 중입니다!</h3>
        <span>약 30초 정도 소요됩니다.</span>
      </div>
      <div className={styles.timer}>
        <span />
        <span>
          {timer}초 경과{'...'.slice(2 - (timer % 3))}
        </span>
      </div>
      <button type="button" onClick={abort} className={styles.abort}>
        취소
      </button>
    </div>
  );
}
