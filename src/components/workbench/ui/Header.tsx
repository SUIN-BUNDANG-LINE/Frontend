import styles from './Header.module.css';
import Svg from '../misc/Svg';
import { useSurveyStore } from '../store';
import { cout } from '../func';

type Props = {
  tab: number;
  tabHandler: (newTab: number) => void;
};

function Header({ tab, tabHandler }: Props) {
  const store = useSurveyStore((state) => state);

  const testSubmit = () => {
    const data = cout(store);
    console.log(data);
  };

  const tabData = [
    {
      label: '기초 정보',
      path: 'M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z',
    },
    {
      label: '설문 작성',
      path: 'M360-600v-80h360v80H360Zm0 120v-80h360v80H360Zm120 320H200h280Zm0 80H240q-50 0-85-35t-35-85v-120h120v-560h600v361q-20-2-40.5 1.5T760-505v-295H320v480h240l-80 80H200v40q0 17 11.5 28.5T240-160h240v80Zm80 0v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z',
    },
    {
      label: '미리 보기',
      path: 'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm280-80q-82 0-146.5-44.5T240-440q29-71 93.5-115.5T480-600q82 0 146.5 44.5T720-440q-29 71-93.5 115.5T480-280Zm0-60q56 0 102-26.5t72-73.5q-26-47-72-73.5T480-540q-56 0-102 26.5T306-440q26 47 72 73.5T480-340Zm0-100Zm0 60q25 0 42.5-17.5T540-440q0-25-17.5-42.5T480-500q-25 0-42.5 17.5T420-440q0 25 17.5 42.5T480-380Z',
    },
    {
      label: '통계 보기',
      path: 'M200-160v-240h120v240H200Zm240 0v-440h120v440H440Zm240 0v-640h120v640H680Z',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.first}>
          <svg xmlns="http://www.w3.org/2000/svg" height="42px" viewBox="0 -960 960 960" width="42px" fill="#5f6368">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </div>
        <div className={styles.second}>
          <div className={styles.title}>메이플스토리 리부트 서버 vs. 본 서버: 당신의 선택은?</div>
          <div className={styles.menu}>
            {tabData.map(({ label, path }, index) => (
              <button
                onClick={() => tabHandler(index)}
                type="button"
                className={`${styles.menuItem} ${index === tab ? styles.active : ''}`}
                key={label}>
                <Svg path={path} />
                <div>{label}</div>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.third}>
          <button type="button" className={styles.button} onClick={testSubmit}>
            <div>저장</div>
            <div>@ 3분 전</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
