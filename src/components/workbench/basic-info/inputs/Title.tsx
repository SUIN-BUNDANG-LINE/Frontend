import { useRef } from 'react';
import styles from './Title.module.css';

export default function Title() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      <div className={styles.inputDesc}>
        <div>설문지 제목과 설명</div>
        <div>설문지의 제목과 설명을 입력해주세요.</div>
      </div>
      <input id="title" ref={titleRef} className={styles.title} type="text" placeholder="제목을 입력해주세요." />
      <input
        id="description"
        ref={descriptionRef}
        className={styles.description}
        type="text"
        placeholder="설명을 입력해주세요."
      />
    </div>
  );
}
