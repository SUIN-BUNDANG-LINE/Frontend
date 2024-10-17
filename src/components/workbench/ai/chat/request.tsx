import styles from './request.module.css';

export default function Request() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h3>요청하기</h3>
      </div>
      <div className={styles.target}>
        <p>수정하고 싶은 부분을 알려주세요.</p>
        <div className={styles.targetBtns}>
          <button type="button">기존</button>
          <button type="button" className={styles.active}>
            신규
          </button>
          <select name="id">
            <option value="none">설문지 전체</option>
          </select>
        </div>
      </div>
      <div className={styles.chat}>
        <p>어떻게 수정해야 할지 알려주세요.</p>
        <div className={styles.chatbox}>
          <button type="button">
            <span className={styles.placeholder}>요청사항 입력...</span>
          </button>
          <button type="button" className={styles.submit}>
            <div className={styles.arrow}>↑</div>
          </button>
        </div>
      </div>
    </div>
  );
}
