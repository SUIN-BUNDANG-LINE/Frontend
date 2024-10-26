'use client';

// import Banner from '@/components/main/banner/Banner';
// import { SurveyFinder } from '@/components/main';
import { Suspense } from 'react';
import Heading from '@/components/main/heading';
import Demo from '@/components/main/demo';

export default function Page() {
  return (
    <Suspense>
      <Heading />
      <Demo />
      {/* <Banner /> */}
      {/* <SurveyFinder /> */}
    </Suspense>
  );
}
