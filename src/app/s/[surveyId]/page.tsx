'use client';

import { useSurveyDetails } from '@/queries/survey';
import SurveyDetailsViewer from '@/components/survey/details';

export default function SurveyDetails({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;
  const { data } = useSurveyDetails(surveyId);

  if (!data) {
    return <div>loading...</div>;
  }

  return <SurveyDetailsViewer data={data} />;
}
