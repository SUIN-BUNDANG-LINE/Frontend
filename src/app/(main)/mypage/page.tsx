'use client';

import { useState } from 'react';
import type { MySurveys, SurveyStatus, MySurvey } from '@/services/mypage/types';
import { useMySurveys } from '@/services/mypage/index';
import { StatusForFilter, SortType } from '@/services/mypage/types';
import { useAuth } from '@/hooks/useAuth';
import { dateReaderForMyPage, yymmdd } from '@/utils/dates';
import Error from '@/components/ui/error/Error';
import Loading from '@/components/ui/loading/Loading';
import Link from 'next/link';
import Header from '@/components/mypage/Header';
import Table from '@/components/mypage/Table';
import Field from '@/components/mypage/Field';
import Filter from '@/components/mypage/Filter'; // 필터 컴포넌트 임포트
import Image from 'next/image';

type MyPageSurveyInfo = {
  id: string;
  title: string;
  thumbnail: string | null;
  updatedAt: string;
  status: string;
  responseCount: number;
};

const createdMapper = (arg: MyPageSurveyInfo) => {
  return (
    <>
      <Link
        href={['제작 중', '수정 중', '마감'].includes(arg.status) ? `/workbench/${arg.id}` : `/management/${arg.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={arg.thumbnail !== null ? arg.thumbnail : '/assets/default-thumbnail.webp'}
            width="35"
            height="35"
            style={{ borderRadius: 10, marginRight: '10px' }}
            alt=""
          />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '8px' }}>
            {arg.title}
          </span>
        </span>
      </Link>
      <span>{arg.status}</span>
      <span>{arg.updatedAt}</span>
      <span>{arg.responseCount}건</span>
    </>
  );
};

function translateSurveyStatus(finishedAt: string, status: SurveyStatus): string {
  switch (status) {
    case 'NOT_STARTED':
      return '제작 중';
    case 'IN_PROGRESS':
      return finishedAt !== null ? dateReaderForMyPage(finishedAt) : '응답 받는 중';
    case 'IN_MODIFICATION':
      return '수정 중';
    case 'CLOSED':
      return '마감';
    default:
      return '';
  }
}

function toMyPageSurveyInfos(mySurveys: MySurveys): MyPageSurveyInfo[] {
  return mySurveys.surveys.map((survey: MySurvey) => ({
    id: survey.id,
    title: survey.title,
    thumbnail: survey.thumbnail,
    updatedAt: yymmdd(survey.updatedAt),
    status: translateSurveyStatus(survey.finishedAt, survey.status),
    responseCount: survey.responseCount,
  }));
}

export default function Page() {
  const { user } = useAuth();

  // 필터와 정렬 상태 관리
  const [statusForFilter, setStatusForFilter] = useState<StatusForFilter>(null);
  const [sortType, setSortType] = useState<SortType>('LAST_MODIFIED');

  const { data, isLoading, isError, refetch } = useMySurveys(statusForFilter, sortType);

  const mySurveyInfos = data ? toMyPageSurveyInfos(data) : [];

  if (isLoading) return <Loading message="데이터를 불러오는 중..." />;
  if (isError)
    return (
      <Error message="마이페이지를 불러오지 못했습니다." buttons={[{ text: '재시도', fn: refetch }]} margin="18px" />
    );

  return (
    <>
      <Header username={user?.nickname} surveyCount={mySurveyInfos.length} />

      <Field title="제작한 설문">
        {/* Filter 컴포넌트 사용 */}
        <Filter
          statusForFilter={statusForFilter}
          sortType={sortType}
          onStatusChange={setStatusForFilter}
          onSortChange={setSortType}
        />
        <Table<MyPageSurveyInfo>
          gridTemplateColumns="minmax(245px, 1fr) 120px 140px 70px"
          columnNames={['제목', '상태', '수정일', '응답 수']}
          data={mySurveyInfos}
          dataMapper={createdMapper}
          emptyMessage="제작한 설문이 없습니다."
        />
      </Field>
    </>
  );
}
