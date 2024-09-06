'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useSurveyStore } from '@/store';
import { Field } from '@/store/types';
import Toolbar from '@/components/workbench/Toolbar';
import Canvas from '@/components/workbench/Canvas';
import React from 'react';
import Loading from '@/components/ui/loading/Loading';
import styles from './page.module.css';

function Main() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const sections = useSurveyStore((state) => state.sections);
  const fields = useSurveyStore((state) => state.fields);
  const setSections = useSurveyStore((state) => state.setSections);
  const setFields = useSurveyStore((state) => state.setFields);
  const addField = useSurveyStore((state) => state.addField);

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

      setFields([...others, ...here, ...there]);
    } else {
      related.splice(dst.index, 0, related.splice(src.index, 1)[0]);
      setFields([...others, ...related]);
    }
  };

  const onDragSection = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const replica = structuredClone(sections);
    const [target] = replica.splice(source.index, 1);
    replica.splice(destination.index, 0, target);

    setSections(replica);
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

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          {isClient && (
            <>
              <Toolbar />
              <Canvas />
            </>
          )}
          {!isClient && <Loading message="불러오는 중..." />}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Main;
