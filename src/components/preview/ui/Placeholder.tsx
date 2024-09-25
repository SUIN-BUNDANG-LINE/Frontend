import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';

type Props = { isLoading: boolean; isError: boolean };

export default function Placeholder({ isLoading, isError }: Props) {
  if (isLoading) {
    return <Loading message="설문지를 불러오는 중..." />;
  }
  if (isError) {
    return <Error message="설문지를 불러오지 못했습니다. 새로고침해도 문제가 계속 발견되면 문의해주세요." />;
  }
  return <div>알 수 없는 문제가 발생했습니다.</div>;
}
