import React from 'react';
import 'moment/locale/ko';
import { useSurveyStore } from '@/components/workbench/store';
import RewardSection from '@/components/workbench/basics/reward-section';
import styles from './tab0.module.css';

function Tab0() {
  const { title, description, finishMessage, isVisible, setter } = useSurveyStore((state) => ({
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
    <div className={styles.container}>
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
            placeholder="설문지 제목을 입력하세요"
          />
        </label>
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
            placeholder="설문지 설명을 입력하세요"
          />
        </label>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="survey-thumbnail">
          <span>썸네일</span>
          <input id="survey-thumbnail" type="file" name="thumbnail" className={styles.inputFile} accept="image/*" />
        </label>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="survey-finish-message">
          <span>종료 메시지</span>
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

      <RewardSection />

      <hr />

      <div className={styles.group}>
        <label className={styles.checkboxLabel} htmlFor="survey-is-visible">
          <input
            id="survey-is-visible"
            type="checkbox"
            name="isVisible"
            className={styles.checkbox}
            checked={isVisible}
            onChange={handleChange}
          />
          설문지를 설문이용에 공개하는데 동의합니다.
        </label>
      </div>
    </div>
  );
}

export default Tab0;
