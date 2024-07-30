'use client';

import Banner from '@/components/main/banner/Banner';
import { SurveyFinder } from '@/components/main';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Banner />
      <SurveyFinder />
    </Suspense>
  );
}
