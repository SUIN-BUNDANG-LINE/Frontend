/* eslint-disable no-param-reassign */

import { Draggable, Droppable, DraggableProvided } from '@hello-pangea/dnd';
import { useSurveyStore } from '@/store';
import type { Section } from '@/store/types';
import Field from './Field';
import styles from './Section.module.css'; // Import styles

type Props = {
  section: Section;
  index: number;
};

function SectionComponent({ section, index }: Props) {
  const fields = useSurveyStore((state) => state.fields);
  const setSectionTitle = useSurveyStore((state) => state.setSectionTitle);
  const setSectionDescription = useSurveyStore((state) => state.setSectionDescription);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSectionTitle(section.sectionId, e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSectionDescription(section.sectionId, e.target.value);
  }

  return (
    <Draggable draggableId={section.sectionId} index={index}>
      {(provided: DraggableProvided) => {
        const transform = provided.draggableProps.style?.transform;

        if (provided.draggableProps.style && transform) {
          const t = transform.split(',')[1];
          provided.draggableProps.style.transform = `translate(0px,${t}`;
        }

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={styles.sectionContainer} // Apply section container style
          >
            <div className={styles.dragHandle} {...provided.dragHandleProps}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" width="24px" height="24px">
                <g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 1 -1 0 0 -0)">
                  <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
                </g>
              </svg>
            </div>
            <div className={styles.sectionHeader}>
              <input
                type="text"
                className={styles.sectionTitle}
                value={section.title}
                placeholder="제목 없는 섹션"
                onChange={handleTitleChange}
              />
              <input
                type="text"
                className={styles.sectionDescription}
                value={section.description}
                placeholder="섹션 설명이 없습니다."
                onChange={handleDescriptionChange}
              />
            </div>
            <div className={styles.fieldsContainer}>
              <Droppable key={section.sectionId} droppableId={section.sectionId} type="field">
                {(droppableProvided) => (
                  <ul
                    className={styles.fieldsList} // Apply fields list style
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}>
                    {!fields.find((f) => f.sectionId === section.sectionId) && (
                      <div className={styles.emptyList}>섹션에 질문이 없습니다.</div>
                    )}
                    {fields.map((field) => {
                      if (field.sectionId !== section.sectionId) return null;
                      return (
                        <Field
                          key={field.fieldId}
                          index={fields.filter((f) => f.sectionId === section.sectionId).indexOf(field)}
                          field={field}
                        />
                      );
                    })}
                    {droppableProvided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default SectionComponent;
