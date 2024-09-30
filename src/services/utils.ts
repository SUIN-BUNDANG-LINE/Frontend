const VERSION = 'api/v1';

const makeUrl = (api: string[], params?: { [key: string]: string | number | boolean }) => {
  const URL = [VERSION, ...api].join('/');
  const PARAMS = [] as string[];

  if (params) {
    Object.keys(params).forEach((key) => PARAMS.push(`${key}=${params[key]}`));
  }

  if (PARAMS.length === 0) return URL;
  return `${URL}?${PARAMS.join('&')}`;
};

// queryString의 value가 undefined면 무시하면서 URL을 만드는 util 함수
const makeUrlWithUndefined = (api: string[], params?: { [key: string]: string | number | boolean | undefined }) => {
  const URL = [VERSION, ...api].join('/');
  const PARAMS = [] as string[];

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        PARAMS.push(`${key}=${params[key]}`);
      }
    });
  }

  if (PARAMS.length === 0) return URL;
  return `${URL}?${PARAMS.join('&')}`;
};

export { makeUrl, makeUrlWithUndefined };
