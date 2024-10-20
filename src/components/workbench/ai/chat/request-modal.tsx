/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './request-modal.module.css';

type Props = {
  prompt: string;
  setPrompt: (arg: string) => void;
  closeModal: () => void;
  submit: () => void;
};

export default function RequestModal({ prompt, setPrompt, closeModal, submit }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.max(48, Math.min(e.target.scrollHeight, 120))}px`;
  };

  React.useEffect(() => {
    const textarea = document.getElementById('request-modal-textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.focus();
      textarea.selectionStart = textarea.value.length;
    }
  }, []);

  const submitAndClose = () => {
    submit();
    closeModal();
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.chatbox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.description}>AI가 어떤 작업을 해야 하는지 알려주세요.</div>
        <div className={styles.chatboxInnerWrapper}>
          <textarea
            id="request-modal-textarea"
            className={styles.textarea}
            value={prompt}
            onChange={handleChange}
            placeholder="요청사항 입력..."
            maxLength={1000}
          />
          <div className={styles.right}>
            <button type="button" className={styles.submit} onClick={submitAndClose} disabled={prompt.length === 0}>
              ↑
            </button>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={closeModal}>
            저장하고 닫기
          </button>
          <button type="button" onClick={submitAndClose} disabled={prompt.length === 0}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
