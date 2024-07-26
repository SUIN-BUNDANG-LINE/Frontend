'use client';

import DetailsViewer from '@/components/survey-details';
import { useSurveysDetails } from '@/services/surveys';

export default function Page({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;
  const { data } = useSurveysDetails(surveyId);

  if (!data) {
    return <div>loading...</div>;
  }

  return <DetailsViewer data={data} surveyId={surveyId} />;
}
