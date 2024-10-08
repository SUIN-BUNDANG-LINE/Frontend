import React from 'react';
import styles from './index.module.css';
import Svg from '../../misc/Svg';
import ProvideData from './provide-data';
import { FormData } from './types';
import { DEFAULT_FORM_DATA } from '../../misc/placeholders';
import { Store } from '../../types';
import Approve from './approve';

type Props = {
  openEdit: () => void;
  openDraft: () => void;
  closeAi: () => void;
};

export default function Draft({ openEdit, openDraft, closeAi }: Props) {
  const [phase, setPhase] = React.useState(1);
  /*
    phase 0 : pending
    phase 1 : 기본 상태 (데이터 입력)
    phase 2 : 미리 보기, 적용 여부 선택
  */

  const [formData, setFormData] = React.useState<FormData>(DEFAULT_FORM_DATA);
  const [dataType, setDataType] = React.useState<'text' | 'file'>('text');
  const [survey, setSurvey] = React.useState<Store | null>(null);

  const abort = () => {
    // ProvideData를 강제 unmount시켜 query cancel
    setPhase(0);
  };

  React.useEffect(() => {
    if (phase === 0) setPhase(1);
  }, [phase]);

  const closeHandler = () => {
    closeAi();
  };

  const draftHandler = () => {
    openDraft();
  };

  const editHandler = () => {
    openEdit();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Svg path="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
            <div className={styles.tabSwitch}>
              <button type="button" onClick={draftHandler} disabled>
                초안 생성
              </button>
              <button type="button" onClick={editHandler}>
                AI 편집
              </button>
            </div>
          </div>
          <div className={styles.right}>
            <button type="button" aria-label="닫기" onClick={closeHandler}>
              <Svg path="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </button>
          </div>
        </div>
        {phase === 1 && (
          <ProvideData
            abort={abort}
            formData={formData}
            setFormData={setFormData}
            dataType={dataType}
            setDataType={setDataType}
            setPhase={setPhase}
            setSurvey={setSurvey}
          />
        )}
        {phase === 2 && survey && (
          <Approve
            survey={survey}
            back={() => {
              setSurvey(null);
              setPhase(1);
            }}
            closeAi={closeAi}
          />
        )}
      </div>
    </div>
  );
}
