/* eslint-disable no-param-reassign */

import { Draggable, Droppable, DraggableProvided } from '@hello-pangea/dnd';
import React from 'react';
import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import Button from '@/components/ui/button/Button';
import type { RouteStrategy, Section } from '../types';
import { useSurveyStore } from '../store';
import Field from './Field';
import Svg from '../misc/Svg';
import RouteModal from './RouteModal';
import { Other, Submit } from '../misc/Route';
import styles from './Section.module.css'; // Import styles

type Props = {
  section: Section;
  index: number;
  isDraggingOver: boolean;
  activeState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

function SectionComponent({ section, index, isDraggingOver, activeState }: Props) {
  const { sectionId } = section;

  const [fold, setFold] = React.useState(false);
  const [routeBtn, setRouteBtn] = React.useState('');

  const { isOpen, openModal, closeModal } = useModal();

  const fields = useSurveyStore((state) => state.fields);
  const sections = useSurveyStore((state) => state.sections);
  const editSection = useSurveyStore((state) => state.editSection);
  const copySection = useSurveyStore((state) => state.copySection);
  const deleteSection = useSurveyStore((state) => state.deleteSection);
  const addSection = useSurveyStore((state) => state.addSection);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editSection({ sectionId, updates: { title: e.target.value } });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editSection({ sectionId, updates: { description: e.target.value } });
  };

  const handleDuplicate = () => copySection({ index, section });

  const handleDelete = () => deleteSection({ sectionId });

  const handleFold = () => setFold((pre) => !pre);

  const handleSave = (newStrat: RouteStrategy) => {
    editSection({ sectionId, updates: { routeStrategy: newStrat } });
  };

  React.useEffect(() => {
    const normalize = () => {
      editSection({ sectionId, updates: { routeStrategy: { type: 'sequential', detail: null } } });
      return { type: 'sequential' as const, detail: null };
    };

    /**
     * Updates the route strategy if necessary and returns the result.
     * Otherwise, returns the current strategy as is.
     * @returns {RouteStrategy} The updated strategy
     */

    const refreshRouteStrategy = (): RouteStrategy => {
      const currentStrat = section.routeStrategy;
      const { type, detail } = currentStrat;

      switch (type) {
        case 'manual': {
          if (detail !== Submit && !sections.find((i) => i.sectionId === detail)) return normalize();
          return currentStrat;
        }

        case 'conditional': {
          const keyField = fields.find((f) => f.fieldId === detail.key);
          if (!keyField || keyField.sectionId !== section.sectionId || keyField.type !== 'radio' || !keyField.required)
            return normalize();

          const optRemoved = detail.router.some((i) => i.id !== Other && keyField.options.every((j) => j.id !== i.id));
          const optAdded = keyField.options.some((i) => detail.router.every((j) => j.id !== i.id));
          const othRemoved = !keyField.other && detail.router.some((i) => i.id === Other);
          const othAdded = keyField.other && detail.router.every((i) => i.id !== Other);
          const nxtRemoved = detail.router.some(
            (i) => i.next !== Submit && sections.every((j) => j.sectionId !== i.next)
          );

          const updateRequired = optRemoved || optAdded || othRemoved || othAdded || nxtRemoved;
          if (!updateRequired) return currentStrat;

          const sectionIndex = sections.findIndex((i) => i.sectionId === sectionId);
          const nextSectionId = 1 + sectionIndex < sections.length ? sections.at(1 + sectionIndex)!.sectionId : Submit;

          let newRouter = detail.router.map((i) => i);

          if (optRemoved) {
            newRouter = newRouter.filter((i) => i.id === Other || keyField.options.some((j) => j.id === i.id));
          }
          if (othRemoved) {
            newRouter = newRouter.filter((i) => i.id !== Other);
          }
          if (optAdded) {
            newRouter.push(
              ...keyField.options
                .filter((i) => newRouter.every((j) => j.id !== i.id))
                .map(({ id }) => ({ id, next: nextSectionId }))
            );
          }
          if (othAdded) {
            newRouter.push({ id: Other, next: nextSectionId });
          }
          if (nxtRemoved) {
            newRouter = newRouter.map((i) =>
              i.next !== Submit && sections.every((j) => j.sectionId !== i.next) ? { id: i.id, next: nextSectionId } : i
            );
          }

          const newRouteStrategy = { type: 'conditional' as const, detail: { key: detail.key, router: newRouter } };

          editSection({
            sectionId,
            updates: { routeStrategy: newRouteStrategy },
          });

          return newRouteStrategy;
        }

        case 'sequential':
        default:
          return currentStrat;
      }
    };

    const getButtonContent = (strat: RouteStrategy) => {
      const { type, detail } = strat;

      switch (type) {
        case 'manual': {
          const t = sections.find((i) => i.sectionId === detail)?.title || '제목 없는 섹션';
          return detail === Submit ? '제출' : t;
        }
        case 'sequential': {
          return '순서대로';
        }
        case 'conditional': {
          const t = fields.find((i) => i.fieldId === detail.key)?.title || '제목 없는 질문';
          return `"${t.length > 16 ? `${t.slice(0, 16)}...` : t}"을 기준으로 분기`;
        }
        default: {
          return '알 수 없음';
        }
      }
    };

    setRouteBtn(getButtonContent(refreshRouteStrategy()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, sectionId, sections]);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title="다음 섹션">
          <RouteModal
            section={section}
            sections={sections}
            fields={fields}
            oldStrategy={section.routeStrategy}
            handleSave={handleSave}
            closeModal={closeModal}
          />
        </Modal>
      )}
      <Draggable draggableId={section.sectionId} index={index}>
        {(provided: DraggableProvided) => {
          const transform = provided.draggableProps.style?.transform;

          if (provided.draggableProps.style && transform) {
            const t = transform.split(',')[1];
            provided.draggableProps.style.transform = `translate(0px,${t}`;
          }

          return (
            <div ref={provided.innerRef} {...provided.draggableProps} className={styles.sectionWrapper}>
              <div className={`${styles.addSection} ${isDraggingOver ? styles.hidden : ''}`}>
                <button type="button" onClick={() => addSection({ index })}>
                  여기에 새 섹션 추가
                </button>
              </div>
              <div className={styles.sectionContainer}>
                <div className={styles.dragHandle} {...provided.dragHandleProps}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" width="24px" height="24px">
                    <g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 1 -1 0 0 -0)">
                      <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
                    </g>
                  </svg>
                </div>
                <div className={styles.sectionActions}>
                  <div className={styles.sectionActionsGroup}>
                    <button type="button" className={styles.sectionAction} onClick={handleFold}>
                      <Svg
                        size="16px"
                        path={
                          fold
                            ? 'M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z'
                            : 'M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z'
                        }
                      />
                      <div>{fold ? '자세히' : '간단히'}</div>
                    </button>
                  </div>
                  <div className={styles.sectionActionsGroup}>
                    <button type="button" className={styles.sectionAction} onClick={handleDuplicate}>
                      <Svg
                        size="16px"
                        path="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
                      />
                      <div>복제</div>
                    </button>
                    <button type="button" className={styles.sectionAction} onClick={handleDelete}>
                      <Svg
                        size="16px"
                        path="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                      />
                      <div>삭제</div>
                    </button>
                  </div>
                </div>
                <div className={styles.sectionHeader}>
                  <input
                    type="text"
                    className={styles.sectionTitle}
                    value={section.title}
                    placeholder="제목 없는 섹션"
                    maxLength={100}
                    onChange={handleTitleChange}
                  />
                  <input
                    type="text"
                    className={styles.sectionDescription}
                    value={section.description}
                    placeholder="섹션 설명이 없습니다."
                    maxLength={1000}
                    onChange={handleDescriptionChange}
                  />
                </div>
                {fold && (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div className={`${styles.fieldSummary} ${styles.fieldsListReplacer}`} onClick={handleFold}>
                    질문 {fields.filter((f) => f.sectionId === section.sectionId).length}개 (클릭해서 펼치기)
                  </div>
                )}
                {!fold && (
                  <div className={styles.fieldsContainer}>
                    <Droppable key={section.sectionId} droppableId={section.sectionId} type="field">
                      {(droppableProvided) => (
                        <ul
                          className={`${!fields.find((f) => f.sectionId === section.sectionId) ? styles.fieldsListReplacer : styles.fieldsList}`} // Apply fields list style
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}>
                          {!fields.find((f) => f.sectionId === section.sectionId) && (
                            <div>표시할 질문이 없습니다. 왼쪽 질문 상자에서 끌어다 놓아보세요.</div>
                          )}
                          {fields.map((field) => {
                            if (field.sectionId !== section.sectionId) return null;
                            return (
                              <Field
                                key={field.fieldId}
                                index={fields.filter((f) => f.sectionId === section.sectionId).indexOf(field)}
                                field={field}
                                activeState={activeState}
                              />
                            );
                          })}
                          {droppableProvided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                )}
                <div className={styles.routeWrapper}>
                  <div className={styles.route}>
                    <div>다음 섹션 &gt; </div>
                    <Button variant="secondary" onClick={() => openModal()}>
                      {routeBtn}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
      {index + 1 === sections.length && (
        <div className={`${styles.addSection} ${isDraggingOver ? styles.hidden : ''}`}>
          <button type="button" onClick={() => addSection({ index: index + 1 })}>
            여기에 새 섹션 추가
          </button>
        </div>
      )}
    </>
  );
}

export default SectionComponent;
