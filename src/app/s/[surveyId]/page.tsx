'use client';

import { useSurveysDetails } from '@/queries/surveys';
import SurveyDetailsViewer from '@/components/survey/details';

export default function SurveyDetails({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;
  const { data } = useSurveysDetails(surveyId);

  if (!data) {
    return <div>loading...</div>;
  }

  return <SurveyDetailsViewer data={data} surveyId={surveyId} />;
}
