import ky, { type KyInstance, type Options } from 'ky';

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
    });
  }

  get<T>(URL: string, options?: Options) {
    return this.kyInstance.get(URL, options).json<T>();
  }

  post<T>(URL: string, options?: Options) {
    return this.kyInstance.post(URL, options).json<T>();
  }
}

export default KyWrapper;
