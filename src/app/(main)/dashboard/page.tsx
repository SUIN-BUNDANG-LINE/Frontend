import Link from 'next/link';
import Header from '@/components/dashboard/overview/Header';
import Table from '@/components/dashboard/overview/Table';
import Field from '@/components/dashboard/overview/Field';
import Button from '@/components/ui/button/Button';
import styles from './page.module.css';

type Created = {
  title: string;
  surveyId: string;
  status: string;
  modifiedAt: string;
};

type Participated = {
  title: string;
  surveyId: string;
  status: string;
  endDate: string;
};

type Collected = {
  title: string;
  surveyId: string;
  date: string;
};

const DUMMY_CREATED = [
  {
    title: '고객 만족도 조사',
    surveyId: '1',
    status: '응답 받는 중',
    modifiedAt: '2024. 03. 26',
  },
  {
    title: '재택 근무 경험',
    surveyId: '2',
    status: '마감 됨',
    modifiedAt: '2024. 04. 01',
  },
  {
    title: '신제품 피드백',
    surveyId: '3',
    status: '미공개',
    modifiedAt: '2024. 07. 10',
  },
] as Created[];

const DUMMY_PARTICIPATED = [
  {
    title: '고객 만족도 조사',
    surveyId: '1',
    status: '응답 받는 중',
    endDate: '2024. 08. 31',
  },
  {
    title: '재택 근무 경험',
    surveyId: '2',
    status: '마감 됨',
    endDate: '2024. 04. 01',
  },
  {
    title: '신제품 피드백',
    surveyId: '3',
    status: '마감 됨',
    endDate: '2024. 07. 10',
  },
] as Participated[];

const DUMMY_COLLECTED = [
  {
    title: '스타벅스 아메리카노 T',
    surveyId: '1',
    date: '2024. 06. 31',
  },
  {
    title: 'BBQ 황금올리브치킨 순살 세트',
    surveyId: '2',
    date: '2024. 04. 01',
  },
] as Collected[];

const createdMapper = (arg: Created) => {
  return (
    <>
      <Link href={`/s/${arg.surveyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span>{arg.title}</span>
      </Link>
      <span>{arg.status}</span>
      <span>{arg.modifiedAt}</span>
      <span style={{ display: 'flex', columnGap: '12px' }}>
        <span>응답 보기</span>
        <span>편집</span>
        <span>관리</span>
      </span>
    </>
  );
};

const participatedMapper = (arg: Participated) => {
  return (
    <>
      <Link href={`/s/${arg.surveyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span>{arg.title}</span>
      </Link>
      <span>{arg.status}</span>
      <span>{arg.endDate}</span>
    </>
  );
};

const collectedMapper = (arg: Collected) => {
  return (
    <>
      <span>{arg.title}</span>
      <Link href={`/s/${arg.surveyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span>설문 보기</span>
      </Link>
      <span>{arg.date}</span>
    </>
  );
};

export default function Page() {
  return (
    <>
      <Header />
      <div className={styles.fieldsWrapper}>
        <Field title="제작한 설문">
          <Table<Created>
            gridTemplateColumns="minmax(200px, 1fr) 96px 96px 142px"
            columnNames={['설문 제목', '상태', '최종 수정', '액션']}
            data={DUMMY_CREATED}
            dataMapper={createdMapper}
            emptyMessage="제작한 설문이 없습니다."
          />
          <Button variant="primary" height="42px">
            <span style={{ color: '#fff' }}>새로운 설문 만들기 →</span>
          </Button>
        </Field>
        <Field title="참여한 설문">
          <Table<Participated>
            gridTemplateColumns="minmax(200px, 1fr) 96px 96px"
            columnNames={['설문 제목', '상태', '마감일']}
            data={DUMMY_PARTICIPATED}
            dataMapper={participatedMapper}
            emptyMessage="참여한 설문이 없습니다."
          />
        </Field>
        <Field title="당첨 이력">
          <Table<Collected>
            gridTemplateColumns="minmax(200px, 1fr) 96px 96px"
            columnNames={['당첨 항목', '액션', '당첨일']}
            data={DUMMY_COLLECTED}
            dataMapper={collectedMapper}
            emptyMessage="당첨 기록이 없습니다."
          />
        </Field>
      </div>
    </>
  );
}
