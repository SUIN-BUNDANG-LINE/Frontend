import { useRef, useEffect } from 'react';

export default function useChatbox(maxHeight: number) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const cur = textareaRef.current;

    const adjustHeight = () => {
      if (!cur) return;

      const newHeight = Math.max(Number(cur.style.minHeight), Math.min(cur.scrollHeight, maxHeight));

      cur.style.height = 'auto';
      cur.style.height = `${newHeight}px`;
    };

    if (cur) {
      adjustHeight();
      cur.addEventListener('input', adjustHeight);
    }

    return () => {
      if (cur) cur.removeEventListener('input', adjustHeight);
    };
  }, [maxHeight]);

  return textareaRef;
}
