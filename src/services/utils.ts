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

export { makeUrl };
