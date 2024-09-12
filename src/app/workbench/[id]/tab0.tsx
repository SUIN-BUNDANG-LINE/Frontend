import React, { useState } from 'react';
import { useSurveyStore } from '@/components/workbench/store';
import styles from './Tab0.module.css';

function Tab0() {
  const title = useSurveyStore((state) => state.title);
  const description = useSurveyStore((state) => state.description);
  const finishMessage = useSurveyStore((state) => state.finishMessage);
  const isVisible = useSurveyStore((state) => state.isVisible);
  const setter = useSurveyStore((state) => state.setter);

  const [formData] = useState({
    thumbnail: null,
    finishedAt: '',
  } as { thumbnail: File | null; finishedAt: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value /* type , checked */ } = e.target;
    setter({ key: name, value });
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="survey-title">
          설문지 정보
          <input
            id="survey-title"
            type="text"
            name="title"
            className={styles.input}
            value={title}
            onChange={handleChange}
            placeholder="설문지 제목을 입력하세요"
            required
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="survey-description">
          설문지 설명
          <textarea
            id="survey-description"
            name="description"
            className={styles.textarea}
            value={description}
            onChange={handleChange}
            placeholder="설문지 설명을 입력하세요"
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="survey-thumbnail">
          썸네일
          <input id="survey-thumbnail" type="file" name="thumbnail" className={styles.inputFile} accept="image/*" />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="survey-finished-at">
          종료 시점
          <input
            id="survey-finished-at"
            type="datetime-local"
            name="finishedAt"
            className={styles.input}
            value={formData.finishedAt}
            onChange={handleChange}
            step="3600"
            required
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="survey-finish-message">
          종료 메시지
          <textarea
            id="survey-finish-message"
            name="finishMessage"
            className={styles.textarea}
            value={finishMessage}
            onChange={handleChange}
            placeholder="종료 메시지를 입력하세요"
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxLabel} htmlFor="survey-is-visible">
          공개 여부
          <input
            id="survey-is-visible"
            type="checkbox"
            name="isVisible"
            className={styles.checkbox}
            checked={isVisible}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
}

export default Tab0;
