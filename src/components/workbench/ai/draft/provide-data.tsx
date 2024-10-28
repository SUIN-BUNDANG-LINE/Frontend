import Button from '@/components/ui/button/Button';
import { showToast } from '@/utils/toast';
import { ErrorCause } from '@/services/ky-wrapper';
import { useFileUpload } from '@/services/s3';
import { FileUploadResponse } from '@/services/s3/types';
import React from 'react';
import styles from './provide-data.module.css';
import type { FormData } from './types';
import { useGenerateSurvey } from '../../service';
import { ImportedSurvey, Store } from '../../types';
import { DEFAULT_FORM_DATA } from '../../misc/placeholders';
import { cin } from '../../func';
import FileArea from './file-area';

const MAX_LENGTH = {
  target: 100,
  affiliation: 100,
  prompt: 20000,
};

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  setSurvey: React.Dispatch<React.SetStateAction<Store | null>>;
  surveyId: string;
};

export default function ProvideData({ formData, setFormData, setPhase, setSurvey, surveyId }: Props) {
  const [elapsedTime, setElapsedTime] = React.useState(0);

  const abortController = React.useRef<AbortController>(new AbortController());

  const abort = () => {
    abortController.current.abort();
    // abort가 최초 1번만 호출돼서 일단은 강제 unmount로 우회...
    // TODO : 이유 알아보기
    setPhase(0);
  };

  const surveyQuery = useGenerateSurvey({
    onSuccess: (data: ImportedSurvey) => {
      setPhase(2);
      setSurvey(cin(data));
    },
    onError: () => {
      setElapsedTime(0);
      showToast('error', '초안을 생성하지 못했습니다. 다시 한번 시도해주세요.');
    },
    surveyId,
  });

  const fileQuery = useFileUpload({
    onSuccess: ({ fileUrl }: FileUploadResponse) => {
      showToast('success', '파일이 업로드 되었습니다!');
      setFormData((prev) => ({ ...prev, file: { ...prev.file, url: fileUrl } }));
    },
    onError: (error: Error) => {
      showToast('error', (error.cause as ErrorCause)?.message || '파일을 업로드하지 못했습니다.');
      setFormData((prev) => ({ ...prev, file: { url: '', name: '' } }));
    },
  });

  React.useEffect(() => {
    if (!surveyQuery.isPending) return () => {};

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [surveyQuery.isPending]);

  const reset = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm('정말로 초기화 하시겠습니까?')) setFormData(DEFAULT_FORM_DATA);
  };

  const submit = () => {
    if (formData.prompt.trim() === '') {
      showToast('error', '요청 사항을 입력해주세요.');
      return;
    }

    const data = {
      target: formData.target,
      groupName: formData.affiliation,
      fileUrl: formData.file.url !== '' ? formData.file.url : null,
      userPrompt: formData.prompt,
    };
    surveyQuery.mutate({ formData: data, signal: abortController.current.signal });
  };

  const clearFile = React.useCallback(() => {
    setFormData((prev) => ({ ...prev, file: { name: '', url: '' } }));
  }, [setFormData]);

  const handleFileChange = (f: File) => {
    const newFormData = new FormData();
    newFormData.append('file', f);
    setFormData((prev) => ({ ...prev, file: { name: f.name, url: prev.file.url } }));
    fileQuery.mutate(newFormData);
  };

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div className={styles.body}>
      {surveyQuery.isPending && (
        <div className={styles.pending}>
          <div className={styles.loader} />
          <h3>설문을 생성하는 중...</h3>
          <p>{elapsedTime}초 경과</p>
          <p>약 30초 정도 소요됩니다. 잠시만 기다려주세요.</p>
          <Button variant="secondary" onClick={abort}>
            생성 포기
          </Button>
        </div>
      )}
      <div className={styles.introduction}>
        <h3>어떤 질문을 해야 할지 막막하신가요?</h3>
        <p>
          설문지를 처음부터 작성하는 게 부담된다면, AI 초안 생성 기능이 도와드립니다! 여러분의 설문 목적에 맞추어 적절한
          질문을 자동으로 만들어드립니다. 아래 정보를 입력하여 바로 시작해 보세요.
        </p>
        <p>주의 : 초안 생성 기능으로 만든 설문조사를 저장하면, 기존 내용은 사라집니다.</p>
      </div>
      <form className={styles.form}>
        <ul>
          <li className={styles.field}>
            <div>
              <span style={{ color: 'red' }}>[필수]</span> 요청 사항
            </div>
            <p>AI에게 하고 싶은 명령을 입력해주세요.</p>
            <textarea
              placeholder="설문을 통해 알고자 하는 것, 각 섹션에서 다룰 주제..."
              maxLength={MAX_LENGTH.prompt}
              value={formData.prompt}
              name="prompt"
              onChange={update}
              disabled={surveyQuery.isPending}
            />
            <div className={styles.maxLength}>
              <span>
                {formData.prompt.length} / {MAX_LENGTH.prompt}자
              </span>
            </div>
          </li>
          <li className={styles.field}>
            <div>정보 입력</div>
            <p>AI가 설문을 생성할 때 활용할 정보를 입력해주세요. ex: 조사한 자료, 위키 문서, 기획서, 논문 등</p>
            <FileArea
              disabled={surveyQuery.isPending}
              file={formData.file}
              clearFile={clearFile}
              handleFileChange={handleFileChange}
            />
            {/* <div className={`${styles.fileWrapper} ${pending || filePending ? styles.disabled : ''}`}>
              <label htmlFor="file-input">
                <input
                  className={styles.fileInputHidden}
                  id="file-input"
                  type="file"
                  accept=".pdf, .txt, .docx, .pptx"
                  onChange={fileHandler}
                  disabled={pending || filePending}
                />
                <div className={styles.fileInput}>업로드</div>
                <span className={styles.fileMessage}>{fileMessage}</span>
              </label>
              <span>* docx, pptx, pdf, txt 파일을 업로드 할 수 있어요.</span>
            </div> */}
          </li>
          <li className={styles.field}>
            <div>참여 대상</div>
            <p>설문에 참여할 대상을 입력하면 좋은 질문을 만드는데 도움이 됩니다.</p>
            <input
              type="text"
              placeholder="대학생, 20대 남성, 행사 참석자..."
              maxLength={MAX_LENGTH.target}
              value={formData.target}
              name="target"
              onChange={update}
              disabled={surveyQuery.isPending}
            />
            <div className={styles.maxLength}>
              <span>
                {formData.target.length} / {MAX_LENGTH.target}자
              </span>
            </div>
          </li>
          <li className={styles.field}>
            <div>소속</div>
            <p>설문 소개 문구에 사용됩니다.</p>
            <input
              type="text"
              placeholder="개인, 팀 이름..."
              maxLength={MAX_LENGTH.affiliation}
              value={formData.affiliation}
              name="affiliation"
              onChange={update}
              disabled={surveyQuery.isPending}
            />
            <div className={styles.maxLength}>
              <span>
                {formData.affiliation.length} / {MAX_LENGTH.affiliation}자
              </span>
            </div>
          </li>
        </ul>
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={reset} disabled={surveyQuery.isPending || fileQuery.isPending}>
            초기화
          </Button>
          <Button variant="primary" onClick={submit} disabled={surveyQuery.isPending || fileQuery.isPending}>
            초안 생성하기
          </Button>
        </div>
      </form>
    </div>
  );
}
