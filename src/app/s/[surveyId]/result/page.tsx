'use client';

import SurveyResult from '@/components/survey-result';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';

export default function Page({ params }: { params: { surveyId: string } }) {
  const searchParams = useSearchParams();

  const { surveyId } = params;
  const reward = searchParams.get('reward') ? decodeURIComponent(searchParams.get('reward')!) : null;
  const until = searchParams.get('until')
    ? moment(decodeURIComponent(searchParams.get('until')!)).format('YYYY년 MM월 DD일')
    : null;

  return <SurveyResult surveyId={surveyId} reward={reward} until={until} />;
}
