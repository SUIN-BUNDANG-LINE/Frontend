'use client';

import DetailsViewer from '@/components/survey-details';
import Loading from '@/components/ui/loading/Loading';
import { useSurveysDetails } from '@/services/surveys';

export default function Page({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;
  const { data, isLoading } = useSurveysDetails(surveyId);

  if (isLoading || !data) return <Loading message="설문조사 정보를 불러오는 중..." />;

  return <DetailsViewer data={data} surveyId={surveyId} />;
}
