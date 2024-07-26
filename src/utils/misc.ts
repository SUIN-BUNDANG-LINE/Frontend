const writeClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export { writeClipboard };
