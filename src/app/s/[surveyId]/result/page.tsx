'use client';

import SurveyResult from '@/components/survey-result';
import { useSearchParams } from 'next/navigation';

export default function Page({ params }: { params: { surveyId: string } }) {
  const searchParams = useSearchParams();

  const { surveyId } = params;
  const reward = searchParams.get('reward') ? decodeURIComponent(searchParams.get('reward')!) : null;

  return <SurveyResult surveyId={surveyId} reward={reward} />;
}
