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
        설문지를 설문이용에 공개하는데 동의합니다.
      </label>
    </div>
  );
}
