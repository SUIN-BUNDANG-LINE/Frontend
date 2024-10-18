/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { showToast } from '@/utils/toast';
import { useChat } from '@/services/ai';
import { ErrorCause } from '@/services/ky-wrapper';
import styles from './index.module.css';
import Svg from '../../misc/Svg';
import Request from './request';
import type { Actions, Request as RequestType } from '../types/chat';
import { Store } from '../../types';
import Preview from '../preview';
import { CSurvey } from '../types/preview';
import { convert } from '../func/convert';

type Props = {
  openDraft: () => void;
  closeAi: () => void;
  surveyId: string;
  store: Store;
  initStore: ({ store }: { store: Store }) => void;
};

export default function Chat({ openDraft, closeAi, surveyId, store, initStore }: Props) {
  const [request, setRequest] = React.useState<RequestType>({
    isEditGeneratedResult: false,
    userPrompt: '',
    modificationTargetId: surveyId,
    surveyId,
  });

  const [response, setResponse] = React.useState<CSurvey | null>(null);

  const { mutate, isPending } = useChat({
    onSuccess: (data) => {
      setResponse(convert(data));
    },
    onError: (error) => {
      const { message } = (error.cause as ErrorCause) || '알 수 없는 오류가 발생했습니다.';
      showToast('error', message);
    },
  });

  const actions: Actions = {
    setBase: (arg: boolean) => setRequest((p) => ({ ...p, isEditGeneratedResult: arg })),
    setPrompt: (arg: string) => setRequest((p) => ({ ...p, userPrompt: arg })),
    setTarget: (arg: string | null) => setRequest((p) => ({ ...p, modificationTargetId: arg || surveyId })),
  };

  const closeHandler = () => {
    closeAi();
  };

  const draftHandler = () => {
    openDraft();
  };

  const submit = () => {
    mutate(request);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Svg path="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
          <div className={styles.tabSwitch}>
            <button type="button" onClick={draftHandler}>
              초안 생성
            </button>
            <button type="button" disabled>
              AI 편집
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <button type="button" aria-label="닫기" onClick={closeHandler}>
            <Svg path="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </button>
        </div>
      </div>
      <div className={styles.previewWrapper}>
        <div className={styles.preview}>
          <h3>미리보기</h3>
          <p>클릭해서 수정 대상을 지정할 수 있습니다.</p>
          {!response && <Preview sections={store.sections} fields={store.fields} />}
          {response && <Preview survey={response} actions={actions} />}
        </div>
      </div>
      <Request
        request={request}
        actions={actions}
        submit={submit}
        pending={isPending}
        store={store}
        response={response}
      />
    </div>
  );
}
