import { FileUploader } from 'react-drag-drop-files';
import styles from './file-area.module.css';

type Props = {
  file: { name: string; url: string };
  clearFile: () => void;
  handleFileChange: (f: File) => void;
  disabled: boolean;
};

export default function FileArea({ file, clearFile, handleFileChange, disabled }: Props) {
  if (!file.name) {
    return (
      <FileUploader
        disabled={disabled}
        handleChange={handleFileChange}
        name="file"
        types={['DOCX', 'PPTX', 'TXT', 'PDF']}>
        <div className={styles.drop}>
          <div>
            참고할 자료가 있다면 여기에 드래그 하거나 <span className={styles.highlight}>직접 업로드</span> 해주세요.
          </div>
          <div className={styles.limits}>* pptx, docx, pdf, txt 지원, 최대 5MB.</div>
        </div>
      </FileUploader>
    );
  }

  return (
    <div className={styles.display}>
      {file.url && (
        <>
          <button type="button" onClick={clearFile} className={styles.delete}>
            삭제
          </button>
          {file.name}
        </>
      )}
      {!file.url && (
        <>
          <span className={styles.pending} />
          업로드 중...
        </>
      )}
    </div>
  );
}
