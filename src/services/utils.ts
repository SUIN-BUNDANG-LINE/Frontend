const API_URL = process.env.NEXT_PUBLIC_API_URL;

const makeUrl = (api: string[], params?: { [key: string]: string | number | boolean }) => {
  const url = new URL([API_URL, ...api].join('/'));
  if (params) Object.keys(params).forEach((key) => url.searchParams.append(key, `${params[key]}`));

  return url.toString();
};

export { makeUrl };
