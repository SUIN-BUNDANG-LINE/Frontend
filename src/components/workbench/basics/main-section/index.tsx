import { useSurveyStore } from '../../store';
import styles from '../section.module.css';
import Thumbnail from './thumbnail';

export default function MainSection() {
  const { title, description, finishMessage, setter } = useSurveyStore((state) => ({
    title: state.title,
    description: state.description,
    finishMessage: state.finishMessage,
    isVisible: state.isVisible,
    setter: state.setter,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setter({
        key: name,
        value: (e as React.ChangeEvent<HTMLInputElement>).target.checked,
      });
      return;
    }
    setter({ key: name, value });
  };

  return (
    <>
      <div className={styles.groupInfo}>
        <h3>주요 정보</h3>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="survey-title">
          <span>설문지 제목</span>
          <input
            id="survey-title"
            type="text"
            name="title"
            className={styles.input}
            value={title}
            onChange={handleChange}
            maxLength={100}
            placeholder="설문지 제목을 입력하세요"
          />
        </label>
        <div className={styles.maxLength}>
          <span>{title.length} / 100자</span>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="survey-description">
          <span>설문지 설명</span>
          <textarea
            id="survey-description"
            name="description"
            className={styles.textarea}
            value={description}
            onChange={handleChange}
            maxLength={1000}
            placeholder="설문지 설명을 입력하세요"
          />
        </label>
        <div className={styles.maxLength}>
          <span>{description.length} / 1000자</span>
        </div>
      </div>

      <Thumbnail />

      <div className={styles.group}>
        <label className={styles.label} htmlFor="survey-finish-message">
          <span>종료 메시지</span>
          <textarea
            id="survey-finish-message"
            name="finishMessage"
            className={styles.textarea}
            value={finishMessage}
            onChange={handleChange}
            maxLength={1000}
            placeholder="종료 메시지를 입력하세요"
          />
        </label>
        <div className={styles.maxLength}>
          <span>{finishMessage.length} / 1000자</span>
        </div>
      </div>
    </>
  );
}
