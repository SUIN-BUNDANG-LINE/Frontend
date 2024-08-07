import * as cookies from 'cookies-next';
import type { DefaultOptions } from 'cookies-next/lib/types';

const defaultOptions: DefaultOptions = {
  path: '/',
  secure: true,
};

export type CookieKey = 'user-profile' | 'and-more';

export const useCookie = () => {
  const getCookie = (key: CookieKey, options?: DefaultOptions) => {
    return cookies.getCookie(key, { ...defaultOptions, ...options });
  };

  const setCookie = (key: CookieKey, data: string, options?: DefaultOptions) => {
    cookies.setCookie(key, data, { ...defaultOptions, ...options });
  };

  const deleteCookie = (key: CookieKey, options?: DefaultOptions) => {
    cookies.deleteCookie(key, { ...defaultOptions, ...options });
  };

  const hasCookie = (key: CookieKey, options?: DefaultOptions) => {
    return cookies.hasCookie(key, { ...defaultOptions, ...options });
  };

  return { getCookie, setCookie, deleteCookie, hasCookie };
};
