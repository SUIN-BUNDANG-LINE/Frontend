const writeClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const decodeBase64 = (str: string) => {
  const bs = atob(str);
  const arr = Array.from(bs).map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`);
  const res = decodeURIComponent(arr.join(''));

  return res;
};

export { writeClipboard, decodeBase64 };
