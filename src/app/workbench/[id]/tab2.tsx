'use client';

import Rewards from '@/components/workbench/ready/rewards';
import Toc from '@/components/workbench/ready/toc';
import { useSurveyStore } from '@/components/workbench/store';
import React from 'react';

function Tab2() {
  const sections = useSurveyStore((state) => state.sections);
  const fields = useSurveyStore((state) => state.fields);
  const rewardConfig = useSurveyStore((state) => state.rewardConfig);

  const toc = React.useMemo(
    () =>
      sections.map((s) => ({
        section: s,
        fields: fields.filter((i) => i.sectionId === s.sectionId),
      })),
    [sections, fields]
  );

  return (
    <>
      <Toc toc={toc} />
      <Rewards config={rewardConfig} />
      <div style={{ width: '100%', margin: '24px auto', textAlign: 'center' }}>
        TODO: 여기에 설문조사 공개 버튼 삽입
      </div>
    </>
  );
}

export default Tab2;
