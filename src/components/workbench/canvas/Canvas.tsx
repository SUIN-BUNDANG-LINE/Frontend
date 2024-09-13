'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import { Droppable, DroppableProvided } from '@hello-pangea/dnd';
import React from 'react';
import { useSurveyStore } from '../store';
import Section from './Section';
import styles from './Canvas.module.css';

function Canvas() {
  const sections = useSurveyStore((state) => state.sections);

  return (
    <Droppable droppableId="sections" direction="vertical" type="section">
      {(provided: DroppableProvided, snapshot) => (
        <div className={styles.canvas} ref={provided.innerRef} {...provided.droppableProps}>
          {sections.map((section, index) => {
            return (
              <Section
                section={section}
                key={section.sectionId}
                index={index}
                isDraggingOver={snapshot.isDraggingOver}
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Canvas;
