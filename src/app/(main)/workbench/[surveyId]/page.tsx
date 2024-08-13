'use client';

import { useState } from 'react';
import { Nav } from '@/components/workbench/nav/Nav';
import { BasicInfo } from '@/components/workbench/basic-info/BasicInfo';
import { useWorkbenchSurvey } from '@/services/workbench';

export default function Page({ params }: { params: { surveyId: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { surveyId } = params;

  const [activeNav, setActiveNav] = useState(0);
  const { data } = useWorkbenchSurvey(surveyId);

  return (
    <>
      <Nav active={activeNav} setActive={(i) => setActiveNav(i)} />
      <BasicInfo />
      <textarea rows={30} cols={30} value={JSON.stringify(data || {})} />
    </>
  );
}
