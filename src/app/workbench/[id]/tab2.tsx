'use client';

import Toc from '@/components/workbench/ready/toc';
import { useSurveyStore } from '@/components/workbench/store';
import React from 'react';

function Tab2() {
  const sections = useSurveyStore((state) => state.sections);
  const fields = useSurveyStore((state) => state.fields);

  const toc = React.useMemo(
    () =>
      sections.map((s) => ({
        section: s,
        fields: fields.filter((i) => i.sectionId === s.sectionId),
      })),
    [sections, fields]
  );

  return <Toc toc={toc} />;
}

export default Tab2;
