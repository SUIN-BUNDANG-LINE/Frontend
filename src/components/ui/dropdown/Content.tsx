import styles from './Content.module.css';

interface Props extends React.PropsWithChildren {
  clickHandler?: () => void;
}

export default function Content({ children, clickHandler }: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={styles.content} onClick={clickHandler}>
      {children}
    </div>
  );
}
