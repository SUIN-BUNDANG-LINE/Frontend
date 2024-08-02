import styles from './Button.module.css';

type Variant = 'default' | 'primary' | 'secondary' | string;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  width: string | number;
  height: string | number;
}

function Button({ variant, width, height, children, ...props }: React.PropsWithChildren<Partial<ButtonProps>>) {
  const classes = [styles.button];

  classes.push(styles[variant || 'default']);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button {...props} type="button" className={classes.join(' ')} style={{ width, height, ...props.style }}>
      {children}
    </button>
  );
}

export default Button;
