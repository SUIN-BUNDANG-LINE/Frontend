'use client';

import { Footer, Header } from '@/components/layout/survey';
import { useSurveysDetails } from '@/queries/surveys';
import styles from './layout.module.css';

export default function SurveyLayout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { surveyId: string } }>) {
  const { surveyId } = params;
  const { data, isLoading } = useSurveysDetails(surveyId);

  if (!data || isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Header title={data.title} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}
