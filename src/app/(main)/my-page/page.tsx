'use client';

import { useEffect, useState } from 'react';
import type { MySurveys, SurveyStatus, MySurvey } from '@/services/my-page/types';
import { getMySurveys } from '@/services/my-page/fetch';
import { StatusForFilter, SortType } from '@/services/my-page/types';
import { useAuth } from '@/hooks/useAuth';
import { dateReaderForMyPage, yymmdd } from '@/utils/dates';
import Link from 'next/link';
import Header from '@/components/my-page/Header';
import Table from '@/components/my-page/Table';
import Field from '@/components/my-page/Field';
import Filter from '@/components/my-page/Filter'; // 필터 컴포넌트 임포트
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
        href={arg.status in ['제작 중', '수정 중', '마감'] ? `/workbench/${arg.id}` : `/management/${arg.id}`}
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mySurveyInfos, setMySurveyInfos] = useState<MyPageSurveyInfo[]>([]);

  // 필터와 정렬 상태 관리
  const [statusForFilter, setStatusForFilter] = useState<StatusForFilter>(null);
  const [sortType, setSortType] = useState<SortType>('LAST_MODIFIED');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMySurveys(statusForFilter, sortType); // 필터와 정렬 값 전달
        setMySurveyInfos(toMyPageSurveyInfos(response));
      } catch (err) {
        setError('설문 결과를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [statusForFilter, sortType]); // 필터나 정렬이 변경될 때마다 데이터 가져오기

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

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
