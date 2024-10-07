'use client';

import { useState } from 'react';
import type { MySurveys, SurveyStatus, MySurvey } from '@/services/mypage/types';
import { useMySurveys } from '@/services/mypage/index';
import { StatusForFilter, SortType } from '@/services/mypage/types';
import { useAuth } from '@/hooks/useAuth';
import { dateReaderForMyPage, yymmdd } from '@/utils/dates';
import ErrorComponent from '@/components/ui/error/Error';
import Loading from '@/components/ui/loading/Loading';
import Link from 'next/link';
import Header from '@/components/mypage/Header';
import Table from '@/components/mypage/Table';
import Field from '@/components/mypage/Field';
import Filter from '@/components/mypage/Filter';
import Image from 'next/image';
import useModal from '@/hooks/useModal';
import { FaTrashAlt } from 'react-icons/fa';
import { showToast } from '@/utils/toast';
import Modal from '@/components/ui/modal/Modal';
import Button from '@/components/ui/button/Button';
import { fetchSurveyDelete } from '@/services/management/fetch';
import styles from './page.module.css';

type MyPageSurveyInfo = {
  id: string;
  title: string;
  thumbnail: string | null;
  updatedAt: string;
  status: string;
  responseCount: number;
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

  const [statusForFilter, setStatusForFilter] = useState<StatusForFilter>(null);
  const [sortType, setSortType] = useState<SortType>('LAST_MODIFIED');
  const [currentSurveyInfo, setCurrentSurveyInfo] = useState<string[] | null>();
  const { data, isLoading, isError, refetch } = useMySurveys(statusForFilter, sortType);

  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const confirmDelete = async () => {
    closeDeleteModal();
    try {
      if (currentSurveyInfo) await fetchSurveyDelete({ surveyId: currentSurveyInfo[0] });
      else throw new Error();
      showToast('success', '설문이 삭제되었습니다.');
      refetch();
    } catch (error) {
      showToast('error', '설문 삭제에 실패했습니다.');
    }
  };

  const handleDeleteSurvey = (surveyId: string, title: string) => {
    setCurrentSurveyInfo([surveyId, title]);
    openDeleteModal();
  };

  const mySurveyInfos = data ? toMyPageSurveyInfos(data) : [];

  const createdMapper = (arg: MyPageSurveyInfo) => {
    return (
      <>
        <Link
          href={['제작 중', '수정 중'].includes(arg.status) ? `/workbench/${arg.id}` : `/management/${arg.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '42px 1fr', alignItems: 'center' }}>
            <Image
              src={arg.thumbnail || '/assets/default-thumbnail.webp'}
              width="35"
              height="35"
              style={{ borderRadius: 10, marginRight: '10px' }}
              alt=""
            />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '8px' }}>
              {arg.title || '제목 없는 설문'}
            </span>
          </div>
        </Link>
        <span>{arg.status}</span>
        <span>{arg.updatedAt}</span>
        <span>{arg.responseCount}건</span>
        <div className={styles.buttonGroup}>
          <Button onClick={() => handleDeleteSurvey(arg.id, arg.title)}>
            <FaTrashAlt />
          </Button>
        </div>
      </>
    );
  };

  const getSurveyTitle = (): string => {
    if (!currentSurveyInfo) return '';
    const surveyTitle = currentSurveyInfo[1];
    if (surveyTitle.length <= 20) return ` "${surveyTitle}"`;
    return ` "${currentSurveyInfo[1].slice(0, 20)}..."`;
  };

  if (isLoading) return <Loading message="데이터를 불러오는 중..." />;
  if (isError)
    return (
      <ErrorComponent
        message="마이페이지를 불러오지 못했습니다."
        buttons={[{ text: '재시도', fn: refetch }]}
        margin="18px"
      />
    );

  return (
    <>
      <Header username={user?.nickname} surveyCount={mySurveyInfos.length} />

      <Field title="제작한 설문">
        <Filter
          statusForFilter={statusForFilter}
          sortType={sortType}
          onStatusChange={setStatusForFilter}
          onSortChange={setSortType}
        />
        <Table<MyPageSurveyInfo>
          gridTemplateColumns="minmax(245px, 1fr) 120px 140px 70px 40px"
          columnNames={['제목', '상태', '수정일', '응답 수', '액션']}
          data={mySurveyInfos}
          dataMapper={createdMapper}
          emptyMessage="제작한 설문이 없습니다."
        />
      </Field>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="설문 삭제 확인">
        <p>정말 설문{getSurveyTitle()}을 삭제하시겠습니까? 삭제한 설문은 복구할 수 없습니다.</p>
        <div className={styles.modalActions}>
          <Button variant="primary" onClick={confirmDelete}>
            삭제하기
          </Button>
          <Button variant="secondary" onClick={closeDeleteModal}>
            취소
          </Button>
        </div>
      </Modal>
    </>
  );
}
