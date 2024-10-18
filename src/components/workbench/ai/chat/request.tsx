import React from 'react';
import type { Actions, Request as RequestType } from '../types/chat';
import RequestModal from './request-modal';
import styles from './request.module.css';

type Props = {
  request: RequestType;
  actions: Actions;
  submit: () => void;
  pending: boolean;
};

export default function Request({ request, actions, submit, pending }: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      {openModal && (
        <RequestModal
          prompt={request.userPrompt}
          setPrompt={actions.setPrompt}
          closeModal={() => setOpenModal(false)}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <h3>요청하기</h3>
        </div>
        <div className={styles.target}>
          <p>수정하고 싶은 부분을 알려주세요.</p>
          <div className={styles.targetBtns}>
            <button
              type="button"
              onClick={() => actions.setBase(false)}
              className={!request.isEditGeneratedResult ? styles.active : ''}>
              기존
            </button>
            <button
              type="button"
              onClick={() => actions.setBase(true)}
              className={request.isEditGeneratedResult ? styles.active : ''}>
              신규
            </button>
            <select name="id" value={request.modificationTargetId}>
              <option value={request.surveyId}>설문지 전체</option>
            </select>
          </div>
        </div>
        <div className={styles.chat}>
          <p>어떻게 수정해야 할지 알려주세요.</p>
          <div className={styles.chatbox}>
            <button type="button" onClick={() => setOpenModal(true)}>
              {request.userPrompt.length === 0 && <span className={styles.placeholder}>요청사항 입력...</span>}
              {request.userPrompt.length !== 0 && <span className={styles.prompt}>{request.userPrompt}</span>}
            </button>
            <button type="button" className={styles.submit} onClick={submit} disabled={pending}>
              <div className={styles.arrow}>↑</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
