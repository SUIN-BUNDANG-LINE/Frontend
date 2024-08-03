'use client';

import Drawing from '@/components/survey-p/drawing/Drawing';
import { useSearchParams } from 'next/navigation';

export default function Page({ params }: { params: { surveyId: string } }) {
  const searchParams = useSearchParams();

  const { surveyId } = params;
  const pid = searchParams.get('pid') ? decodeURIComponent(searchParams.get('pid')!) : null;

  if (!pid) {
    return <div>부정한 접근입니다.</div>;
  }

  return <Drawing surveyId={surveyId} participantId={pid} />;
}
