import Button from '@/components/ui/button/Button';
import { showToast } from '@/utils/toast';
import { ErrorCause } from '@/services/ky-wrapper';
import styles from './provide-data.module.css';
import { FormData } from './types';
import { useGenerateSurvey } from '../../service';
import { ImportedSurvey, Store } from '../../types';
import { DEFAULT_FORM_DATA } from '../../misc/placeholders';
import { cin } from '../../func';

const MAX_LENGTH = {
  occupation: 100,
  affiliation: 100,
  data: 12000,
  prompt: 1000,
};

type Props = {
  abort: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  dataType: 'file' | 'text';
  setDataType: React.Dispatch<React.SetStateAction<'file' | 'text'>>;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  setSurvey: React.Dispatch<React.SetStateAction<Store | null>>;
};

export default function ProvideData({
  abort,
  formData,
  setFormData,
  dataType,
  setDataType,
  setPhase,
  setSurvey,
}: Props) {
  const { mutate, isPending: pending } = useGenerateSurvey({
    onSuccess: (data: ImportedSurvey) => {
      setPhase(2);
      setSurvey(cin(data));
    },
    onError: (error: Error) => {
      console.error(error);
      console.error(error.cause as ErrorCause);
    },
  });

  const reset = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm('정말로 초기화 하시겠습니까?')) setFormData(DEFAULT_FORM_DATA);
  };

  const submit = () => {
    if ((dataType === 'text' && formData.data.trim() === '') || (dataType === 'file' && !formData.file)) {
      showToast('error', '프로젝트 기획서, 논문 등 AI가 설문을 생성할 때 활용할 정보를 입력해주세요.');
      return;
    }

    if (dataType === 'text') {
      const method = 'text-document';
      const data = {
        job: formData.occupation,
        groupName: formData.affiliation,
        textDocument: formData.data,
        userPrompt: formData.prompt,
      };
      mutate({ method, formData: data });
    }
  };

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div className={styles.body}>
      <div className={styles.introduction}>
        <h3>어떤 질문을 해야 할지 막막하신가요?</h3>
        <p>
          설문지를 처음부터 작성하는 게 부담된다면, AI 초안 생성 기능이 도와드립니다! 여러분의 설문 목적에 맞추어 적절한
          질문을 자동으로 만들어드립니다. 아래 정보를 입력하여 바로 시작해 보세요.
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
                className={dataType === 'text' ? styles.active : ''}
                disabled={pending}>
                텍스트 입력
              </button>
              <button
                type="button"
                onClick={() => setDataType('file')}
                className={dataType === 'file' ? styles.active : ''}
                disabled={pending}>
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
                  onChange={update}
                  disabled={pending}
                />
                <div className={styles.maxLength}>
                  <span>{formData.data.length} / 12000자</span>
                </div>
              </>
            )}
            {dataType === 'file' && (
              <>
                <span>pdf, txt 파일만 업로드 할 수 있습니다.</span>
                <input type="file" accept=".pdf, .txt" />
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
              onChange={update}
              disabled={pending}
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
              onChange={update}
              disabled={pending}
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
              onChange={update}
              disabled={pending}
            />
            <div className={styles.maxLength}>
              <span>{formData.affiliation.length} / 100자</span>
            </div>
          </li>
        </ul>
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={reset} disabled={pending}>
            초기화
          </Button>
          <Button variant="primary" onClick={submit} disabled={pending}>
            초안 생성하기
          </Button>
        </div>
      </form>
      {pending && (
        <button type="button" onClick={abort}>
          생성 포기
        </button>
      )}
    </div>
  );
}
