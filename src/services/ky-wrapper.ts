import ky, { HTTPError, type KyInstance, type Options } from 'ky';

const beforeError = async (error: HTTPError) => {
  const res = error;

  try {
    res.cause = await error.response.json<ErrorCause>();
  } catch (e) {
    res.cause = { code: undefined, errors: undefined, message: '알 수 없는 오류가 발생했습니다.' };
  }

  return res;
};

class KyWrapper {
  kyInstance: KyInstance;

  constructor() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    this.kyInstance = ky.create({
      prefixUrl: apiUrl,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      retry: 1,
      hooks: {
        beforeError: [beforeError],
      },
    });
  }

  async get<T>(URL: string, options?: Options) {
    try {
      return await this.kyInstance.get(URL, options).json<T>();
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
      throw new Error('서버와의 통신에 실패했습니다.', {
        cause: { code: undefined, errors: undefined, message: '서버와의 통신에 실패했습니다.' },
      });
    }
  }

  async put<T>(URL: string, options?: Options) {
    try {
      return await this.kyInstance.put(URL, options).json<T>();
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
      throw new Error('서버와의 통신에 실패했습니다.', {
        cause: { code: undefined, errors: undefined, message: '서버와의 통신에 실패했습니다.' },
      });
    }
  }

  async post<T>(URL: string, options?: Options) {
    try {
      return await this.kyInstance.post(URL, options).json<T>();
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
      throw new Error('서버와의 통신에 실패했습니다.', {
        cause: { code: undefined, errors: undefined, message: '서버와의 통신에 실패했습니다.' },
      });
    }
  }
}

export interface ErrorCause {
  code: string;
  message: string;
  errors: { field: string; value: string; reason: string }[];
}

export const kyWrapper = new KyWrapper();
