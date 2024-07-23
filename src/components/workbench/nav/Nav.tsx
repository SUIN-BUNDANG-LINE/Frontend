'use client';

import Wrapper from '@/components/layout/Wrapper';
import styles from './Nav.module.css';

interface Props {
  active: number;
  setActive: (i: number) => void;
}

export function Nav({ active, setActive }: Props) {
  const navTitle = ['기초 정보', '설문지 작성', '미리보기'];
  const li = navTitle.map((title, i) => ({ title, active: i === active }));

  return (
    <Wrapper outerColor="#fff">
      <div className={styles.container}>
        <ul>
          {li.map(({ title, active: isActive }, i) => (
            <button
              type="button"
              key={title}
              className={`${styles.li} ${isActive ? styles.active : undefined}`}
              onClick={() => setActive(i)}>
              <div className={styles.indicator}>
                <div className={isActive ? styles.active : undefined} />
              </div>
              <div className={styles.title}>{title}</div>
            </button>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
