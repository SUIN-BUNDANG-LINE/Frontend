/* eslint-disable no-alert */

import styles from './Banner.module.css';

export default function Banner() {
  const onCreate = () => {
    alert('준비중입니다.');
  };

  return (
    <div className={styles.banner}>
      <div className={styles.innerBox}>
        <div className={styles.hello}>
          <div>
            <p className={styles.highlight}>설문이용</p>에서 설문조사를 시작해보세요!
          </div>
          <div>설문이용은 설문조사 제작자와 참여자가 함께하는 장소입니다. </div>
          <button className={styles.create} type="button" onClick={onCreate}>
            설문조사 만들기 →
          </button>
        </div>
        {/* <div className={styles.stats}>
          <div className={styles.stat}>
            <span>생성된 설문</span>
            <span>364개</span>
          </div>
          <div className={styles.stat}>
            <span>누적 응답 수</span>
            <span>214,748건</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
