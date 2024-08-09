import styles from './Text.module.css';

interface Props {
  content: string;
  dispatcher: (a: string) => void;
}

export default function TextResponse({ content, dispatcher }: Props) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="답변을 입력해주세요."
      value={content}
      onChange={(e) => dispatcher(e.target.value)}
      maxLength={1000}
    />
  );
}
