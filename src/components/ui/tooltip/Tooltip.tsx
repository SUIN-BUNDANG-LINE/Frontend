import styles from './Tooltip.module.css';

interface TooltipProps {
  text: string;
  maxWidth?: string | number;
}

function Tooltip({ text, maxWidth, children }: React.PropsWithChildren<TooltipProps>) {
  return (
    <div className={styles.container}>
      {children}
      <span className={styles.tooltip} style={{ maxWidth: maxWidth || undefined }}>
        {text}
      </span>
    </div>
  );
}

export default Tooltip;
