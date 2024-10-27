import React from 'react';
import useChatbox from '@/hooks/useChatbox';
import { type FileUploadResponse } from '@/services/s3/types';
import { ErrorCause } from '@/services/ky-wrapper';
import { useFileUpload } from '@/services/s3';
import { showToast } from '@/utils/toast';
import { ImportedSurvey } from '@/components/workbench/types';
import { type Request } from './types';
import styles from './form.module.css';
import FileArea from './file-area';
import { useGenerateSurvey } from './hooks';
import Generating from './generating';

type Props = {
  request: Request;
  setRequest: React.Dispatch<React.SetStateAction<Request>>;
  unmount: () => void;
  load: (s: ImportedSurvey) => void;
  visitorId: string | undefined;
};

export default function Form({ request, setRequest, unmount, load, visitorId }: Props) {
  const abortController = React.useRef<AbortController>(new AbortController());
  const textareaRef = useChatbox(180); // 20 * 9
  const { file, prompt } = request;

  // queries

  const surveyQuery = useGenerateSurvey({
    onSuccess: (data) => {
      showToast('success', '설문지가 완성되었습니다!');
      load(data);
    },
    onError: (error) => {
      showToast('error', (error.cause as ErrorCause)?.message || '설문지를 만들지 못했습니다.');
      unmount();
    },
    visitorId,
  });

  const fileQuery = useFileUpload({
    onSuccess: ({ fileUrl }: FileUploadResponse) => {
      setRequest((prev) => ({ ...prev, file: { ...prev.file, url: fileUrl } }));
    },
    onError: (error: Error) => {
      showToast('error', (error.cause as ErrorCause)?.message || '파일을 업로드하지 못했습니다.');
      setRequest((prev) => ({ ...prev, file: { url: '', name: '' } }));
    },
  });

  const updateRequest = (field: keyof Request, value: unknown) => {
    setRequest((prev) => ({ ...prev, [field]: value }));
  };

  const clearFile = React.useCallback(() => {
    setRequest((prev) => ({ ...prev, file: { name: '', url: '' } }));
  }, [setRequest]);

  const handleFileChange = (f: File) => {
    const formData = new FormData();
    formData.append('file', f);
    updateRequest('file', { name: f.name });
    fileQuery.mutate(formData);
  };

  const abort = () => {
    abortController.current.abort();
    unmount();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt.trim()) {
      showToast('error', '요청 사항을 입력해주세요.');
      return;
    }

    surveyQuery.mutate({
      form: {
        userPrompt: prompt,
        fileUrl: file.url === '' ? null : file.url,
        target: '',
        groupName: '',
      },
      signal: abortController.current.signal,
    });
  };

  if (surveyQuery.isPending) {
    return <Generating abort={abort} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={styles.prompt}
        placeholder="어떤 내용의 설문지를 만들어 볼까요?"
        value={prompt}
        onChange={(e) => updateRequest('prompt', e.target.value.slice(0, 20000))}
        maxLength={20000}
      />
      <div className={`${styles.warning} ${prompt.length >= 20000 ? styles.full : ''}`}>
        최대 20000자까지 입력할 수 있습니다.
      </div>
      <div className={styles.bottom}>
        <FileArea file={file} clearFile={clearFile} handleFileChange={handleFileChange} />
        <button type="submit" className={styles.submit} disabled={fileQuery.isPending || !visitorId}>
          <div className={styles.submitInner}>만들기</div>
        </button>
      </div>
    </form>
  );
}
