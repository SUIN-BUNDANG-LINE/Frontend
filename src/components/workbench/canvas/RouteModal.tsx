import Button from '@/components/ui/button/Button';
import React from 'react';
import { Conditional, Field, RadioField, RouteStrategy, Section } from '../types';
import styles from './RouteModal.module.css'; // Import styles
import { Other, Placeholder, Submit } from '../misc/Route';

type Props = {
  section: Section;
  sections: Section[];
  fields: Field[];
  oldStrategy: RouteStrategy;
  handleSave: (strat: RouteStrategy) => void;
  closeModal: () => void;
};

export default function RouteModal({ section, sections, fields, oldStrategy, handleSave, closeModal }: Props) {
  const [strat, setStrat] = React.useState<RouteStrategy>(oldStrategy);
  const [error, setError] = React.useState<string>();

  const handleSelectType = (newType: RouteStrategy['type']) => {
    if (strat.type === newType) return;
    setStrat(
      (() => {
        switch (newType) {
          case 'manual':
            return { type: 'manual', detail: Placeholder };
          case 'conditional':
            return { type: 'conditional', detail: { key: Placeholder, router: [] } };
          default:
            return { type: 'sequential', detail: null };
        }
      })()
    );
    setError(undefined);
  };

  const handleManual = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setStrat({ type: 'manual', detail: key });
  };

  const handleConditionalBase = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;

    const targetField = fields.find((f) => f.fieldId === key) as RadioField;
    const newRouter = targetField.options.map(({ id, content }) => ({ id, content, next: Placeholder }));
    if (targetField.other) newRouter.push({ id: Other, content: '기타 응답', next: Placeholder });

    setStrat({
      type: 'conditional',
      detail: { key, router: newRouter },
    });
  };

  const handleConditionalDetail = (optionId: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRouter = (strat as Conditional).detail.router.map(({ id, content, next }) => {
      return { id, content, next: optionId === id ? e.target.value : next };
    });

    setStrat((p) => ({
      type: 'conditional',
      detail: {
        key: (p as Conditional).detail.key,
        router: newRouter,
      },
    }));
  };

  const onSubmit = () => {
    let errorMessage = '';

    switch (strat.type) {
      case 'sequential':
        break;
      case 'manual':
        if (strat.detail === Placeholder) {
          errorMessage = '어느 섹션으로 이동할지 선택해주세요.';
          break;
        }
        break;
      case 'conditional':
        if (strat.detail.key === Placeholder) {
          errorMessage = '기준이 될 질문을 선택해주세요.';
          break;
        }
        if (strat.detail.router.some(({ next }) => next === Placeholder)) {
          errorMessage = '모든 응답에 대해 다음 섹션을 선택해주세요.';
          break;
        }
        break;
      default:
    }

    if (errorMessage.length !== 0) {
      setError(errorMessage);
    } else {
      handleSave(strat);
      closeModal();
    }
  };

  return (
    <>
      <div className={styles.desc}>
        참여자가{' '}
        <Button type="button" variant="secondary">
          다음
        </Button>{' '}
        버튼을 눌렀을 때 이동할 섹션을 설정해주세요.
      </div>
      <div className={styles.opts}>
        <button
          type="button"
          className={`${styles.opt} ${strat.type === 'sequential' ? styles.active : ''}`}
          onClick={() => handleSelectType('sequential')}>
          <div className={styles.optTitle}>순서대로</div>
          <div className={styles.optDesc}>바로 아래의 섹션으로 이동합니다.</div>
        </button>
        <button
          type="button"
          className={`${styles.opt} ${strat.type === 'manual' ? styles.active : ''}`}
          onClick={() => handleSelectType('manual')}>
          <div className={styles.optTitle}>직접 설정</div>
          <div className={styles.optDesc}>어느 섹션으로 이동할지 직접 선택합니다.</div>
          {strat.type === 'manual' && (
            <div className={styles.optInteract}>
              <div>이동할 섹션을 선택해주세요.</div>
              <select value={strat.detail} onChange={handleManual}>
                <option value="$placeholder" disabled>
                  선택하기...
                </option>
                {sections.map(({ sectionId: sid, title }) => (
                  <option
                    key={sid}
                    value={sid}
                    label={title || '제목 없는 섹션'}
                    disabled={sid === section.sectionId}
                  />
                ))}
                <option value="$submit">제출 화면</option>
              </select>
            </div>
          )}
        </button>
        <button
          type="button"
          className={`${styles.opt} ${strat.type === 'conditional' ? styles.active : ''}`}
          onClick={() => handleSelectType('conditional')}>
          <div className={styles.optTitle}>질문으로 분기</div>
          <div className={styles.optDesc}>
            질문을 하나 선택하고, 답변에 따라 어느 섹션으로 이동할지 직접 결정합니다.
            <br />* 필수 응답인 단일 선택 질문만 선택할 수 있습니다.
          </div>
          {strat.type === 'conditional' && (
            <div className={styles.optInteract}>
              <div>어느 질문을 기준으로 분기할지 선택해주세요.</div>
              <select value={strat.detail.key} onChange={handleConditionalBase}>
                <option value="$placeholder" disabled>
                  선택하기...
                </option>
                {fields.map((field) => {
                  if (field.sectionId !== section.sectionId || field.type !== 'radio' || !field.required) return null;
                  return <option key={field.fieldId} value={field.fieldId} label={field.title || '제목 없는 질문'} />;
                })}
              </select>
              {strat.detail.router.length !== 0 && (
                <div className={styles.optBranches}>
                  {strat.detail.router.map(({ id, content, next }) => {
                    return (
                      <div key={id}>
                        <div>응답 &ldquo;{content}&rdquo;</div>
                        <select value={next} onChange={handleConditionalDetail(id)}>
                          <option value="$placeholder" disabled>
                            선택하기...
                          </option>
                          {sections.map(({ sectionId: sid, title }) => (
                            <option
                              key={sid}
                              value={sid}
                              label={title || '제목 없는 섹션'}
                              disabled={sid === section.sectionId}
                            />
                          ))}
                          <option value={Submit}>제출 화면</option>
                        </select>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </button>
        <div className={styles.submit}>
          {error && (
            <div className={styles.error}>
              <span className={styles.errorIcon}>⚠</span>
              {error}
            </div>
          )}
          <Button variant="primary" onClick={onSubmit}>
            저장하고 닫기
          </Button>
        </div>
      </div>
    </>
  );
}
