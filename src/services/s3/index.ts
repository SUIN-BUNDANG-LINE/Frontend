import { useMutation } from '@tanstack/react-query';
import ky, { HTTPError } from 'ky';
import { ErrorCause } from '../ky-wrapper';
import { FileUploadResponse } from './types';

const beforeError = async (error: HTTPError) => {
  const res = error;

  try {
    res.cause = await error.response.json<ErrorCause>();
  } catch (e) {
    console.log(e);
    res.cause = { code: undefined, errors: undefined, message: '알 수 없는 오류가 발생했습니다.' };
    if (res.response.status === 413) res.cause = { code: undefined, errors: undefined, message: '파일이 너무 큽니다.' };
  }

  return res;
};

export const useFileUpload = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: FileUploadResponse) => unknown;
  onError: (error: Error) => unknown;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      ky
        .post<FileUploadResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/s3/upload`, {
          body: formData,
          hooks: { beforeError: [beforeError] },
          credentials: 'include',
        })
        .json(),
    onSuccess,
    onError,
  });
};
