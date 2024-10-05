import Image from 'next/image';
import { useSurveyStore } from '../../store';
import styles from './index.module.css';

export default function MiscSection() {
  const { isVisible, setter } = useSurveyStore((state) => ({
    isVisible: state.isVisible,
    setter: state.setter,
  }));

  const changeHandler = () => {
    setter({ key: 'isVisible', value: !isVisible });
  };

  return (
    <div className={styles.group}>
      <label className={styles.checkboxLabel} htmlFor="survey-is-visible">
        <input
          id="survey-is-visible"
          type="checkbox"
          name="isVisible"
          className={styles.checkbox}
          checked={isVisible}
          onChange={changeHandler}
        />
        설문지를 설문이용에 공개하는데 동의합니다. (권장)
      </label>
      <div className={styles.description}>
        설문지를 공개하면 다음과 같이 설문이용의 메인 페이지에 노출되어 누구나 참여할 수 있게 됩니다.
      </div>
      <Image
        src="/assets/what_isvisible_does.png"
        alt="예시"
        width={676}
        height={422.5}
        style={{ width: '100%', height: 'auto', margin: '12px 0' }}
      />
    </div>
  );
}
