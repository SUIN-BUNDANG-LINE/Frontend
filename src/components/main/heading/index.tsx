import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { FaAngleDown } from 'react-icons/fa6';
import styles from './index.module.css';

export default function Heading() {
  const guest = !useAuth().user;

  const scrollDown = () => {
    const button = document.getElementById('scrollDown');
    if (!button) return;
    const buttonBottom = button.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top: buttonBottom, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mid}>
        <h1 className={styles.title}>
          나의 AI 설문조사 제작 파트너, <span className={styles.highlight}>설문이용!</span>
        </h1>
        <p className={styles.subtitle}>1분이면 충분합니다. 지금 바로 설문조사를 만들어보세요!</p>
        <div className={styles.links}>
          {guest && (
            <Link href="/login">
              <div className={styles.login}>소셜 로그인으로 시작하기</div>
            </Link>
          )}
          {!guest && (
            <Link href="/mypage">
              <div className={styles.login}>설문조사 만들러 가기</div>
            </Link>
          )}
          <Link href="/s">
            <div className={styles.surveys}>공개된 설문조사 둘러보기 →</div>
          </Link>
        </div>
      </div>
      <div className={styles.bot} id="scrollDown">
        <button type="button" onClick={scrollDown}>
          <FaAngleDown size={48} /> 바로 써보기
        </button>
      </div>
    </div>
  );
}
