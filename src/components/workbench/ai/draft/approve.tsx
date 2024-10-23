// import Field from '@/components/preview/ui/Participate/Field';
import React from 'react';
import Button from '@/components/ui/button/Button';
import { Store } from '../../types';
import styles from './approve.module.css';
import Svg from '../../misc/Svg';
import { useSurveyStore } from '../../store';
import Preview from '../preview';

type Props = {
  survey: Store;
  back: () => void;
  closeAi: () => void;
  openChat: () => void;
};

export default function Approve({ survey, back, closeAi, openChat }: Props) {
  const { sections, fields } = survey;
  const initStore = useSurveyStore((state) => state.initStore);

  const resize = () => {
    const textarea = document.getElementById('textarea');
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  React.useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const approve = (aiEdit?: true) => {
    initStore({ store: survey });
    if (aiEdit) {
      openChat();
    } else {
      closeAi();
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.introduction}>
        <h3>생성 완료!</h3>
        <p>내용을 확인하고, 마음에 들면 저장해주세요.</p>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <span>별로에요</span>
            <Button variant="secondary" onClick={back}>
              돌아가기
            </Button>
          </div>
          <div className={styles.button}>
            <span>좋아요</span>
            <div className={styles.approveButtons}>
              <Button variant="primary" onClick={() => approve()}>
                적용하기
              </Button>
              <Button variant="primary" onClick={() => approve(true)}>
                적용하고 AI 편집으로
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.legend}>
          <Svg
            fill="#fff"
            size="32px"
            path="M360-600v-80h360v80H360Zm0 120v-80h360v80H360Zm120 320H200h280Zm0 80H240q-50 0-85-35t-35-85v-120h120v-560h600v361q-20-2-40.5 1.5T760-505v-295H320v480h240l-80 80H200v40q0 17 11.5 28.5T240-160h240v80Zm80 0v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"
          />
          <h3>AI가 작성한 초안</h3>
          <p>마음에 드는 설문지가 생성되었는지 확인해보세요.</p>
        </div>
        <Preview
          store={{
            sections,
            fields,
            finishMessage: survey.finishMessage,
            title: survey.title,
            description: survey.description,
          }}
        />
      </div>
    </div>
  );
}
