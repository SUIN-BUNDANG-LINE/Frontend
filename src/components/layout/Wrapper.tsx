import styles from './Wrapper.module.css';

interface Props {
  outerColor?: string;
  innerColor?: string;
  maxWidth?: string;
  zIndex?: number | string;
}

export default function Wrapper({
  children,
  outerColor,
  innerColor,
  maxWidth,
  zIndex,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={styles.wrapper} style={{ backgroundColor: outerColor, zIndex }}>
      <div className={styles.container} style={{ backgroundColor: innerColor, maxWidth }}>
        {children}
      </div>
    </div>
  );
}
