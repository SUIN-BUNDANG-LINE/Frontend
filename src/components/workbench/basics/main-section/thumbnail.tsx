import Image from 'next/image';
import { useFileUpload } from '@/services/s3';
import React from 'react';
import { showToast } from '@/utils/toast';
import { FileUploadResponse } from '@/services/s3/types';
import { ErrorCause } from '@/services/ky-wrapper';
import styles from './thumbnail.module.css';
import { useSurveyStore } from '../../store';

export default function Thumbnail() {
  const { thumbnail, setter } = useSurveyStore((state) => ({
    thumbnail: state.thumbnail,
    setter: state.setter,
  }));

  const { mutate, isPending, isSuccess } = useFileUpload({
    onSuccess: (data: FileUploadResponse) => {
      setter({ key: 'thumbnail', value: data.fileUrl });
    },
    onError: (error: Error) => {
      showToast('error', `파일을 업로드하지 못했습니다: ${(error.cause as ErrorCause).message}`);
    },
  });

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length !== 1) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    mutate(formData);
  };

  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor="survey-thumbnail">
        <span>썸네일</span>
        <div className={styles.grid}>
          <div>
            <Image
              className={styles.image}
              src={thumbnail || '/assets/default-thumbnail.webp'}
              height={128}
              width={128}
              alt="썸네일"
            />
          </div>

          <div className={styles.fileInputWrapper}>
            <label htmlFor="file" className={styles.fileInput}>
              <input
                onChange={changeHandler}
                id="file"
                type="file"
                className={styles.hiddenFileInput}
                accept="image/*"
              />
              <div className={styles.button}>업로드</div>
              {isPending && <div className={styles.uploadMsg}>업로드 중...</div>}
              {isSuccess && (
                <div className={styles.uploadMsg}>썸네일이 변경되었습니다. 반영되는데 몇 초 걸릴 수 있습니다.</div>
              )}
            </label>
          </div>
        </div>
      </label>
    </div>
  );
}
