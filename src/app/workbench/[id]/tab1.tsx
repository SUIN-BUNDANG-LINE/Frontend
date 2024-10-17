'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useSurveyStore } from '@/components/workbench/store';
import { Field } from '@/components/workbench/types';
// import Toolbar from '@/components/workbench/canvas/Toolbar';
import Canvas from '@/components/workbench/canvas/Canvas';
import React from 'react';
import Loading from '@/components/ui/loading/Loading';
import Toolbar2 from '@/components/workbench/canvas/Toolbar2';
import styles from './tab1.module.css';

type Props = {
  openDraft: () => void;
  openChat: () => void;
};

function Tab1({ openDraft, openChat }: Props) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const sections = useSurveyStore((state) => state.sections);
  const fields = useSurveyStore((state) => state.fields);
  const setSections = useSurveyStore((state) => state.setSections);
  const setFields = useSurveyStore((state) => state.setFields);
  const addField = useSurveyStore((state) => state.addField);
  const addSection = useSurveyStore((state) => state.addSection);

  const startFromScratch = () => {
    addSection({ index: 0 });
  };

  const filterById = (data: Field[], sectionId: string | string[]) => {
    if (Array.isArray(sectionId)) return data.filter((f) => sectionId.some((i) => i === f.sectionId));
    return data.filter((f) => f.sectionId === sectionId);
  };

  const filterById2 = (data: Field[], sectionId: string | string[]) => {
    if (Array.isArray(sectionId)) return data.filter((f) => sectionId.every((i) => i !== f.sectionId));
    return data.filter((f) => f.sectionId !== sectionId);
  };

  const onDragField = (result: DropResult) => {
    const { source: src, destination: dst } = result;
    if (!dst) return;

    const srcId = src.droppableId;
    const dstId = dst.droppableId;

    const related = filterById(fields, [srcId, dstId]);
    const others = filterById2(fields, [srcId, dstId]);

    if (srcId === 'toolbar') {
      // index in toolbar
      const indexToType = ['radio', 'checkbox', 'text'] as const;

      addField({
        type: indexToType[src.index],
        index: dst.index,
        sectionId: dst.droppableId,
      });
      return;
    }

    if (srcId !== dstId) {
      const here = filterById(related, srcId);
      const there = filterById(related, dstId);

      there.splice(dst.index, 0, {
        ...here.splice(src.index, 1)[0],
        sectionId: dstId,
      });

      setFields({ fields: [...others, ...here, ...there] });
    } else {
      related.splice(dst.index, 0, related.splice(src.index, 1)[0]);
      setFields({ fields: [...others, ...related] });
    }
  };

  const onDragSection = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const replica = structuredClone(sections);
    const [target] = replica.splice(source.index, 1);
    replica.splice(destination.index, 0, target);

    setSections({ sections: replica });
  };

  const onDragEnd = (result: DropResult) => {
    const { type } = result;

    if (result.destination?.droppableId === 'toolbar') return;

    switch (type) {
      case 'section':
        onDragSection(result);
        break;
      case 'field':
        onDragField(result);
        break;
      default:
    }
  };

  if (!isClient) {
    return <Loading message="불러오는 중..." />;
  }

  if (sections.length === 0) {
    return (
      <div className={styles.getStarted}>
        <div className={styles.isEmpty}>아직 표시할 내용이 없습니다.</div>
        <div className={styles.buttons}>
          <button type="button" onClick={startFromScratch} className={styles.startFromScratch}>
            빈 설문지로 시작하기 →
          </button>
          <button type="button" onClick={openDraft} className={styles.startWithAi}>
            AI로 초안 만들기 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.container}>
          <Toolbar2 openDraft={openDraft} openChat={openChat} />
          <div />
          <div className={styles.canvas}>
            <Canvas />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Tab1;
