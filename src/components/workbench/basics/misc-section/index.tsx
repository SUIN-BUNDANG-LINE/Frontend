// import Image from 'next/image';
import { useSurveyStore } from '../../store';
import styles from './index.module.css';

export default function MiscSection() {
  const { isVisible, isResultOpen, setter } = useSurveyStore((state) => ({
    isVisible: state.isVisible,
    isResultOpen: state.isResultOpen,
    setter: state.setter,
  }));

  const isResultOpenChangeHandler = () => {
    setter({ key: 'isResultOpen', value: !isResultOpen });
  };

  const isVisibleChangeHandler = () => {
    setter({ key: 'isVisible', value: !isVisible });
  };

  return (
    <>
      <div className={styles.groupInfo} style={{ paddingTop: '12px' }}>
        <h3>기타 옵션</h3>
      </div>
      <div className={styles.group}>
        <label className={styles.checkboxLabel} htmlFor="survey-is-result-open">
          <input
            id="survey-is-result-open"
            type="checkbox"
            name="isResultOpen"
            className={styles.checkbox}
            checked={isResultOpen}
            onChange={isResultOpenChangeHandler}
          />
          설문 통계 공개하기
        </label>
        <div className={styles.description}>설문 참여자가 설문 참여 후 설문의 통계를 볼 수 있습니다.</div>
        <br />
        <br />
        <label className={styles.checkboxLabel} htmlFor="survey-is-visible">
          <input
            id="survey-is-visible"
            type="checkbox"
            name="isVisible"
            className={styles.checkbox}
            checked={isVisible}
            onChange={isVisibleChangeHandler}
          />
          설문지를 설문이용에 공개하기
        </label>
        <div className={styles.description} style={{ marginBottom: '24px' }}>
          설문지를 공개하면 설문이용의 설문 목록 페이지에 노출되어 누구나 참여할 수 있게 됩니다.
        </div>
        {/* <Image
        src="/assets/what_isvisible_does.png"
        alt="예시"
        width={676}
        height={422}
        style={{ width: '100%', height: 'auto', margin: '12px 0', boxShadow: 'var(--box-shadow)' }}
      /> */}
      </div>
    </>
  );
}
