import React from 'react';
import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import { v4 as uuid } from 'uuid';
import Svg from '../misc/Svg';
import { useSurveyStore } from '../store';
import { cout, validate } from '../func';
import styles from './header.module.css';
import { ErrorDescriptor } from '../types';
import ErrorItem from './error-item';
import Submit from './submit';

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
    label: '공개 준비',
    path: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z',
  },
];

function Menu({ tab, tabHandler }: { tab: number; tabHandler: (newTab: number) => void }) {
  return (
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
  );
}

type Props = {
  tab: number;
  tabHandler: (newTab: number) => void;
};

function Header({ tab, tabHandler }: Props) {
  const store = useSurveyStore((state) => state);
  const title = useSurveyStore((state) => state.title);
  const [errors /* , setErrors */] = React.useState<ErrorDescriptor[]>([
    { location: ['제목 없는 섹션'], reason: '섹션에 질문이 없습니다.' },
    { location: ['제목 없는 섹션', '리선족의 뜻을 아시나요?'], reason: '중복된 선택지가 있습니다.' },
    { reason: '즉시 추첨인데 리워드가 없음' },
  ]);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSubmit = () => {
    if (errors.length !== 0) openModal();
    if (!validate()) return;
    const data = cout(store);
    console.log(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title={`저장 실패 사유 (${errors.length})`}>
        <h3>다음 문제를 모두 해결해야 저장할 수 있습니다.</h3>
        <div>
          {errors.map(({ reason, location }) => (
            <ErrorItem key={uuid()} reason={reason} location={location} />
          ))}
        </div>
      </Modal>
      <div className={styles.maxUI}>
        <div className={styles.header}>
          <div className={styles.leave}>
            <Svg size="42px" path="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </div>
          <div className={styles.main}>
            <div className={styles.title}>{title || '제목 없는 설문'}</div>
            <Menu tab={tab} tabHandler={tabHandler} />
          </div>
          <Submit errors={errors} handleSubmit={handleSubmit} />
        </div>
      </div>

      <div className={styles.simpleUI}>
        <div className={styles.header}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.leave}>
                <Svg size="42px" path="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </div>
              <div className={styles.title}>{title || '제목 없는 설문'}</div>
            </div>
            <Submit errors={errors} handleSubmit={handleSubmit} />
          </div>
          <Menu tab={tab} tabHandler={tabHandler} />
        </div>
      </div>
    </>
  );
}

export default Header;
