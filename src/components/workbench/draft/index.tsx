import React from 'react';
import Button from '@/components/ui/button/Button';
import styles from './index.module.css';
import Svg from '../misc/Svg';

type FormData = {
  occupation: string;
  affiliation: string;
  prompt: string;
  data: string;
  file: File | null;
};

const DEFAULT_FORM_DATA = {
  occupation: '',
  affiliation: '',
  prompt: '',
  data: '',
  file: null,
};

const MAX_LENGTH = {
  occupation: 100,
  affiliation: 100,
  data: 12000,
  prompt: 1000,
};

export default function Draft() {
  const [formData, setFormData] = React.useState<FormData>(DEFAULT_FORM_DATA);
  const [dataType, setDataType] = React.useState<'text' | 'file'>('text');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Svg path="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
            <div className={styles.tabSwitch}>
              <button type="button" disabled>
                초안 생성
              </button>
              <button type="button">AI 편집</button>
            </div>
          </div>
          <div className={styles.right}>
            <button type="button" aria-label="닫기">
              <Svg path="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </button>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.introduction}>
            <h3>어떤 질문을 해야 할지 막막하신가요?</h3>
            <p>
              설문지를 처음부터 작성하는 게 부담된다면, AI 초안 생성 기능이 도와드립니다! 여러분의 설문 목적에 맞추어
              적절한 질문을 자동으로 만들어드립니다. 아래 정보를 입력하여 바로 시작해 보세요.
            </p>
            <p>주의 : 초안 생성 기능으로 만든 설문조사를 저장하면, 기존 섹션과 질문은 사라집니다.</p>
          </div>
          <form className={styles.form}>
            <ul>
              <li className={styles.field}>
                <div>
                  정보 입력 <strong style={{ color: 'red' }}>*</strong>
                </div>
                <p>[필수] 프로젝트 기획서, 논문 등 AI가 설문을 생성할 때 활용할 정보를 입력해주세요.</p>
                <div className={styles.dataTypeBtns}>
                  <button
                    type="button"
                    onClick={() => setDataType('text')}
                    className={dataType === 'text' ? styles.active : ''}>
                    텍스트 입력
                  </button>
                  <button
                    type="button"
                    onClick={() => setDataType('file')}
                    className={dataType === 'file' ? styles.active : ''}>
                    파일 업로드
                  </button>
                </div>
                {dataType === 'text' && (
                  <>
                    <textarea
                      placeholder=""
                      maxLength={MAX_LENGTH.data}
                      value={formData.data}
                      name="data"
                      onChange={changeHandler}
                    />
                    <div className={styles.maxLength}>
                      <span>{formData.data.length} / 12000자</span>
                    </div>
                  </>
                )}
                {dataType === 'file' && (
                  <>
                    <span>pdf, doc, docx, txt 파일만 업로드 할 수 있습니다.</span>
                    <input type="file" accept=".pdf, .doc, .docx, .txt" />
                  </>
                )}
              </li>
              <li className={styles.field}>
                <div>프롬프트</div>
                <p>AI에게 할 추가 명령을 입력해주세요.</p>
                <textarea
                  placeholder=""
                  maxLength={MAX_LENGTH.prompt}
                  value={formData.prompt}
                  name="prompt"
                  onChange={changeHandler}
                />
                <div className={styles.maxLength}>
                  <span>{formData.prompt.length} / 1000자</span>
                </div>
              </li>
              <li className={styles.field}>
                <div>직업</div>
                <p>직업을 입력하면 최적화된 설문을 만드는데 도움이 됩니다.</p>
                <input
                  type="text"
                  placeholder="대학생, 대학원생, 공무원..."
                  maxLength={MAX_LENGTH.occupation}
                  value={formData.occupation}
                  name="occupation"
                  onChange={changeHandler}
                />
                <div className={styles.maxLength}>
                  <span>{formData.occupation.length} / 100자</span>
                </div>
              </li>
              <li className={styles.field}>
                <div>소속</div>
                <p>소속을 입력하면 최적화된 설문을 만드는데 도움이 됩니다.</p>
                <input
                  type="text"
                  placeholder="개인, 팀 이름..."
                  maxLength={MAX_LENGTH.affiliation}
                  value={formData.affiliation}
                  name="affiliation"
                  onChange={changeHandler}
                />
                <div className={styles.maxLength}>
                  <span>{formData.affiliation.length} / 100자</span>
                </div>
              </li>
            </ul>
            <div className={styles.buttons}>
              <Button variant="secondary">초기화</Button>
              <Button variant="primary">초안 생성하기</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
