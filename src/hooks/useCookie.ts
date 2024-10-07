import * as cookies from 'cookies-next';
import type { DefaultOptions } from 'cookies-next/lib/types';

const isProduction = process.env.NODE_ENV === 'production';

const defaultOptions: DefaultOptions = {
  path: '/',
  secure: true,
  ...(isProduction && { domain: '.sulmoon.io' }), // 운영 환경에서만 domain 설정
};

export type CookieKey = 'user-profile' | 'and-more' | 'JSESSIONID';

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
