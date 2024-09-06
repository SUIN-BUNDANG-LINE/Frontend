'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import { Droppable, DroppableProvided } from '@hello-pangea/dnd';
import { useSurveyStore } from '@/store';
import React from 'react';
import Section from './Section';
import styles from './Canvas.module.css';
import Loading from '../ui/loading/Loading';

function Canvas() {
  const survey = useSurveyStore((state) => state.survey);
  const sections = useSurveyStore((state) => state.sections);
  const fields = useSurveyStore((state) => state.fields);

  const setSections = useSurveyStore((state) => state.setSections);
  const addSection = useSurveyStore((state) => state.addSection);
  const deleteSection = useSurveyStore((state) => state.deleteSection);

  const setFields = useSurveyStore((state) => state.setFields);
  const addField = useSurveyStore((state) => state.addField);
  const editField = useSurveyStore((state) => state.editField);
  const deleteField = useSurveyStore((state) => state.addField);

  return (
    <Droppable droppableId="sections" direction="vertical" type="section">
      {(provided: DroppableProvided) => (
        <div className={styles.canvas}>
          <div className={styles.container} ref={provided.innerRef} {...provided.droppableProps}>
            {sections.map((section, index) => {
              return <Section section={section} key={section.sectionId} index={index} />;
            })}
            {provided.placeholder}
          </div>
          <button
            type="button"
            onClick={() =>
              addSection({
                section: {
                  title: 'untitled section',
                  description: 'section description',
                  routeStrategy: { type: 'sequential', detail: null },
                },
              })
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add
          </button>
        </div>
      )}
    </Droppable>
  );
}

export default Canvas;
