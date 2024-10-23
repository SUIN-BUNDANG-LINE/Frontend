/* eslint-disable react/destructuring-assignment */

import { Actions } from '../types/chat';
import { ChangeType } from '../types/preview';
import styles from './survey-info.module.css';

type Props = {
  oldData?: { title: string; description: string; finishMessage: string } | null;
  newData?: { title: string; description: string; finishMessage: string } | null;
  changeType?: ChangeType;
  actions?: Actions;
};

export default function SurveyInfo(props: Props) {
  const { oldData, newData, actions } = props;
  const changeType = props.changeType || 'UNCHANGED';

  function getPlaceholder() {
    const cname = `${styles.section} ${styles[changeType]}`;
    return <div className={cname} />;
  }

  function getData(data: { title: string; description: string; finishMessage: string }, isNew: boolean) {
    const { title, description, finishMessage } = data;
    const cname = `${styles.section} ${styles[changeType]}`;

    return (
      <button
        type="button"
        className={cname}
        onClick={() => {
          if (!actions) return;
          actions.setBase(isNew);
          actions.setTarget(null);
        }}>
        <div className={styles.title}>{title || '제목 없는 설문'}</div>
        <div className={styles.description}>{description || '설문 설명이 없습니다.'}</div>
        <div className={styles.finishMessage}>{finishMessage || '종료 메시지가 없습니다.'}</div>
      </button>
    );
  }

  const gridTemplateColumns = `repeat(${typeof newData !== 'undefined' ? 2 : 1}, 1fr)`;

  return (
    <div className={`${styles.container} ${styles[changeType]}`}>
      <div className={styles.heading}>
        <span>설문지 정보</span>
      </div>
      <div className={styles.content} style={{ gridTemplateColumns }}>
        {oldData ? getData(oldData, false) : getPlaceholder()}
        {typeof newData !== 'undefined' && (newData ? getData(newData, true) : getPlaceholder())}
      </div>
    </div>
  );
}
