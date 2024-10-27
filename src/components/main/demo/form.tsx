import useChatbox from '@/hooks/useChatbox';
import { FileUploader } from 'react-drag-drop-files';
import { useFileUpload } from '@/services/s3';
import { FileUploadResponse } from '@/services/s3/types';
import { showToast } from '@/utils/toast';
import { ErrorCause } from '@/services/ky-wrapper';
import React from 'react';
import styles from './form.module.css';

export default function Form() {
  const [prompt, setPrompt] = React.useState('');
  const [file, setFile] = React.useState({ name: '', url: '' });

  const textareaRef = useChatbox(20 * 9);

  const onSuccess = (data: FileUploadResponse) => setFile((pre) => ({ ...pre, url: data.fileUrl }));
  const onError = (error: Error) => {
    const message = (error.cause as ErrorCause).message || '설문조사를 생성하지 못했습니다.';
    showToast('error', message);
    setFile({ url: '', name: '' });
  };

  const { mutate: fMutate, isPending: fPending } = useFileUpload({ onSuccess, onError });

  const handleFileChange = (f: File) => {
    const data = new FormData();
    data.append('file', f);

    setFile((pre) => ({ ...pre, name: f.name }));
    fMutate(data);
  };

  const FileContent = React.useMemo(() => {
    // name은 업로드 요청하는 순간 변경
    if (file.name === '') {
      return (
        <>
          <div>
            참고할 자료가 있다면 여기에 드래그 하거나 <span className={styles.highlight}>직접 업로드</span> 해주세요.
          </div>
          <div className={styles.limits}>* pptx, docx, pdf, txt 지원, 최대 5MB.</div>
        </>
      );
    }

    // name은 있는데 url이 없으면 pending
    if (file.url === '') {
      return (
        <>
          <span className={styles.pending} />
          업로드 중...
        </>
      );
    }

    return (
      <>
        <button type="button" onClick={() => setFile({ name: '', url: '' })} className={styles.delete}>
          삭제
        </button>
        {file.name}
      </>
    );
  }, [file]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <textarea
        ref={textareaRef}
        className={styles.prompt}
        placeholder="어떤 내용의 설문지를 만들어 볼까요?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className={styles.bottom}>
        {file.name === '' && (
          <FileUploader handleChange={handleFileChange} name="file" types={['DOCX', 'PPTX', 'TXT', 'PDF']}>
            <div className={styles.drop}>{FileContent}</div>
          </FileUploader>
        )}
        {file.name !== '' && <div className={styles.display}>{FileContent}</div>}
        <button type="submit" className={styles.submit} disabled={fPending}>
          <div className={styles.submitInner}>만들기</div>
        </button>
      </div>
    </form>
  );
}
