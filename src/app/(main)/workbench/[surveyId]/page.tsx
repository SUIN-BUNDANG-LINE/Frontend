'use client';

import { useState } from 'react';
import { Nav } from '@/components/workbench/nav/Nav';
import { BasicInfo } from '@/components/workbench/basic-info/BasicInfo';

export default function Page({ params }: { params: { surveyId: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { surveyId } = params;

  const [activeNav, setActiveNav] = useState(0);

  return (
    <>
      <Nav active={activeNav} setActive={(i) => setActiveNav(i)} />
      <BasicInfo />
    </>
  );
}
