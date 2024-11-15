'use client';

import { usePreview } from '@/components/preview/hooks/usePreview';
import Navigator from '@/components/preview/ui/Participate/Navigator';
import Section from '@/components/preview/ui/Participate/Section';
import Field from '@/components/preview/ui/Participate/Field';
import { validateResponse } from '@/components/preview/funcs';
import ReadyToSubmit from '@/components/preview/ui/Ready';
import { showToast } from '@/utils/toast';
import Header from '@/components/preview/ui/Header';
import { Store } from '@/components/workbench/types';
import React from 'react';
import Button from '@/components/ui/button/Button';
import styles from './preview.module.css';

type Props = {
  survey: Store;
  unmount: () => void;
};

export default function Preview({ survey, unmount }: Props) {
  const { ok, payload } = usePreview(survey);
  const { title, description, finishMessage } = survey;

  const resize = () => {
    const textarea = document.getElementById('description');
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  React.useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!ok) return <div />;

  const { progress, state, actions, responses, dispatch } = payload;

  if (state === 'surveyDetails') {
    return (
      <div className={styles.details}>
        <div className={styles.top}>설문이용 AI가 만든 설문지입니다.</div>
        <h2 className={styles.title}>{title}</h2>
        <textarea id="description" className={styles.description} value={description} readOnly />
        <div className={styles.buttons}>
          <button type="button" className={styles.return} onClick={unmount}>
            ← 또 만들기
          </button>
          <Button
            variant="primary"
            width="100%"
            height="48px"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              actions.push();
            }}>
            생성된 설문 보기
          </Button>
        </div>
      </div>
    );
  }

  const pop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    actions.pop();
  };

  if (state === 'participate') {
    const section = actions.top();
    if (!section) return <div />;

    const fieldData = progress.page.map((field) => {
      const filteredResponses = responses.filter((i) => i.fieldId === field.fieldId);

      const valid =
        field.type === 'text' || field.type === 'radio'
          ? validateResponse({ field, response: filteredResponses[0] })
          : validateResponse({ field, responses: filteredResponses });

      return {
        key: field.fieldId,
        field,
        filteredResponses,
        valid,
      };
    });

    const push = () => {
      const invalidField = fieldData.find((i) => !i.valid);
      if (invalidField) {
        document.getElementById(invalidField.key)?.scrollIntoView();
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      actions.push();
    };

    return (
      <div className={styles.overlay}>
        <Header title={title} />
        <Section title={section.title} description={section.description}>
          {fieldData.map(({ key, field, filteredResponses, valid }) => (
            <Field key={key} field={field} responses={filteredResponses} valid={valid} dispatch={dispatch} />
          ))}
        </Section>
        <Navigator stack={progress.stack} push={push} pop={pop} />
      </div>
    );
  }

  const submitHandler = () => {
    showToast('success', '참여 완료!');
    actions.clear();
  };

  return (
    <div className={styles.overlay}>
      <Header title={title} />
      <ReadyToSubmit message={finishMessage} submitHandler={submitHandler} pop={pop} />
    </div>
  );
}
