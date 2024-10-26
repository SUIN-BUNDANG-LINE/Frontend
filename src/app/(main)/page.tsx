'use client';

// import Banner from '@/components/main/banner/Banner';
// import { SurveyFinder } from '@/components/main';
import { Suspense } from 'react';
import Heading from '@/components/main/heading';

export default function Page() {
  return (
    <Suspense>
      <Heading />
      {/* <Banner /> */}
      {/* <SurveyFinder /> */}
    </Suspense>
  );
}
