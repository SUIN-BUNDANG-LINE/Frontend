'use client';

import { useRouter } from 'next/navigation';
import { Footer, Header } from '@/components/layout/survey';
import { useSurveysDetails } from '@/services/surveys';
import type { ErrorCause } from '@/services/ky-wrapper';
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import styles from './layout.module.css';

export default function SurveyLayout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { surveyId: string } }>) {
  const { surveyId } = params;
  const { data, isError, refetch, error } = useSurveysDetails(surveyId);
  const nextRouter = useRouter();

  const { content, title } = (() => {
    let c;
    let t;

    if (isError) {
      c = (
        <Error
          message={(error.cause as ErrorCause).message}
          buttons={[
            { text: '뒤로', fn: nextRouter.back },
            { text: '재시도', fn: refetch },
          ]}
        />
      );
    }
    if (data) {
      c = <div className={styles.content}>{children}</div>;
      t = data.title;
    }

    return { content: c || <Loading message="설문조사 정보를 불러오는 중..." />, title: t || '설문이용' };
  })();

  return (
    <div className={styles.layout}>
      <Header title={title} />
      {content}
      <Footer />
    </div>
  );
}
