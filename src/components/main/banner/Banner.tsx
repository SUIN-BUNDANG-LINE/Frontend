import { useRouter } from 'next/navigation';
import { fetchCreate } from '@/services/workbench/fetch';
import { ErrorCause } from '@/services/ky-wrapper';
import { showToast } from '@/utils/toast';
import styles from './Banner.module.css';

export default function Banner() {
  const nextRouter = useRouter();

  const rejectHandler = (err: unknown) => {
    if (!err || typeof err !== 'object' || !('cause' in err)) {
      showToast('error', <div>알 수 없는 문제가 발생했습니다.</div>);
      return;
    }

    const { code, message } = err.cause as ErrorCause;

    switch (code) {
      case 'GL0003':
        showToast('error', <div>{message}</div>);
        break;
      case 'GL0004':
        showToast('error', <div>{message}</div>);
        break;
      default:
        showToast('error', <div>{message || '알 수 없는 문제가 발생했습니다.'}</div>);
    }
  };

  const onCreate = async () => {
    try {
      const data = await fetchCreate();
      nextRouter.push(`/workbench/${data.surveyId}`);
    } catch (err) {
      rejectHandler(err);
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.innerBox}>
        <div className={styles.hello}>
          <div>
            <p className={styles.highlight}>설문이용</p>에서 설문조사를 시작해보세요!
          </div>
          <div>설문이용은 설문조사 제작자와 참여자가 함께하는 장소입니다. </div>
          <button className={styles.create} type="button" onClick={onCreate}>
            설문조사 만들기 →
          </button>
        </div>
        {/* <div className={styles.stats}>
          <div className={styles.stat}>
            <span>생성된 설문</span>
            <span>364개</span>
          </div>
          <div className={styles.stat}>
            <span>누적 응답 수</span>
            <span>214,748건</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
