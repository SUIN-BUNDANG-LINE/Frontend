function getNewUrl(key: string, val: string | number) {
  const curSearchParams = new URL(document.location.toString()).searchParams;
  const newSearchParams = { ...Object.fromEntries(curSearchParams.entries()) };
  newSearchParams[key] = `${val}`;

  const str: string[] = [];

  Object.entries(newSearchParams).forEach(([k, v]) => {
    str.push(`${k}=${v}`);
  });

  return `${window.location.protocol}//${window.location.host}${window.location.pathname}?${str.join('&')}`;
}

function pushURLSearchParams(key: string, val: string | number) {
  const newurl = getNewUrl(key, val);
  window.history.pushState({ path: newurl }, '', newurl);
}

function replaceURLSearchParams(key: string, val: string | number) {
  const newurl = getNewUrl(key, val);
  window.history.replaceState({ path: newurl }, '', newurl);
}

export { pushURLSearchParams, replaceURLSearchParams };
