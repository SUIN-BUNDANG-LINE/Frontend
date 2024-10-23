import React from 'react';
import Button from '@/components/ui/button/Button';
import type { Actions, Request as RequestType } from '../types/chat';
import RequestModal from './request-modal';
import styles from './request.module.css';
import { Store } from '../../types';
import { CSurvey } from '../types/preview';

type Props = {
  request: RequestType;
  actions: Actions;
  submit: () => void;
  pending: boolean;
  store: Store;
  response: CSurvey | null;
  phase: number;
  approve: () => void;
};

export default function Request({ request, actions, submit, pending, store, response, phase, approve }: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  const options = React.useMemo(() => {
    const result: { value: string; label: string; base: 'old' | 'new' | 'both' }[] = [];

    result.push({ value: request.surveyId, label: '설문지 전체', base: 'both' });

    if (!response) {
      store.sections.forEach((section) => {
        result.push({
          value: section.sectionId,
          label: section.title ? `섹션 "${section.title}"` : '제목 없는 섹션',
          base: 'old',
        });
      });
      store.fields.forEach((field) => {
        result.push({
          value: field.fieldId,
          label: field.title ? `질문 "${field.title}"` : '제목 없는 질문',
          base: 'old',
        });
      });
      return result;
    }

    response.sections.forEach((section) => {
      if (section.old) {
        result.push({
          value: section.sectionId,
          label: section.old.title ? `섹션 "${section.old.title}"` : '제목 없는 섹션',
          base: 'old',
        });
      }
      if (section.new) {
        result.push({
          value: section.sectionId,
          label: section.new.title ? `섹션 "${section.new.title}"` : '제목 없는 섹션',
          base: 'new',
        });
      }
      section.fields.forEach((field) => {
        if (field.old)
          result.push({
            value: field.fieldId,
            label: field.old.title ? `질문 "${field.old.title}"` : '제목 없는 질문',
            base: 'old',
          });
        if (field.new)
          result.push({
            value: field.fieldId,
            label: field.new.title ? `질문 "${field.new.title}"` : '제목 없는 질문',
            base: 'new',
          });
      });
    });

    return result;
  }, [request.surveyId, response, store.fields, store.sections]);

  if (phase === 1) {
    return (
      <div className={styles.pending}>
        <div className={styles.loader} />
        <p>AI의 답변을 기다리는 중...</p>
      </div>
    );
  }

  return (
    <>
      {openModal && (
        <RequestModal
          prompt={request.userPrompt}
          setPrompt={actions.setPrompt}
          closeModal={() => setOpenModal(false)}
          submit={submit}
        />
      )}
      <div className={styles.wrapper}>
        {response && (
          <div className={styles.approve}>
            <Button variant="primary" onClick={approve}>
              생성된 설문 저장
            </Button>
            <p>생성된 설문이 마음에 든다면 꼭 저장해주세요!</p>
          </div>
        )}
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
              className={request.isEditGeneratedResult ? styles.active : ''}
              disabled={!response}>
              신규
            </button>
            <select name="id" value={request.modificationTargetId} onChange={(e) => actions.setTarget(e.target.value)}>
              {(request.isEditGeneratedResult
                ? options.filter((i) => i.base !== 'old')
                : options.filter((i) => i.base !== 'new')
              ).map((i) => (
                <option value={i.value} label={i.label} key={i.value} />
              ))}
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
            <button
              type="button"
              className={styles.submit}
              onClick={submit}
              disabled={pending || request.userPrompt.length === 0}>
              <div className={styles.arrow}>↑</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
