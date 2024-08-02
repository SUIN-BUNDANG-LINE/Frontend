'use client';

import { Footer, Header } from '@/components/layout/survey';
import { useSurveysDetails } from '@/services/surveys';
import Loading from '@/components/ui/loading/Loading';
import styles from './layout.module.css';

export default function SurveyLayout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { surveyId: string } }>) {
  const { surveyId } = params;
  const { data, isLoading } = useSurveysDetails(surveyId);

  if (!data || isLoading) {
    return (
      <div className={styles.layout}>
        <Header title="" />
        <Loading message="설문조사를 불러오는 중..." />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Header title={data.title} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}
