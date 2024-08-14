'use server';

import type { Metadata, ResolvingMetadata } from 'next';
import { Footer, Header } from '@/components/layout/survey';
import { fetchSurveysDetails } from '@/services/surveys/fetch';
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import styles from './layout.module.css';

const defaultMetadata = {
  title: '설문이용',
  description: '설문 작성부터 홍보까지 한 방에!',
  thumbnail: '/assets/survey-doragon.png',
};

export async function generateMetadata(
  { params }: { params: { surveyId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { surveyId } = params;
  const { title, description, thumbnail } = await fetchSurveysDetails({ surveyId }).catch(() => defaultMetadata);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    openGraph: {
      description,
      images: [thumbnail, ...previousImages],
    },
  };
}

export default async function SurveyLayout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { surveyId: string } }>) {
  const { surveyId } = params;
  const data = await fetchSurveysDetails({ surveyId }).catch(() => null);

  const { content, title } = (() => {
    let c;
    let t;

    if (!data) {
      c = <Error message="설문조사를 불러오지 못했습니다." buttons={[]} />;
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
