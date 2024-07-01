import { ButtonHTMLAttributes, FC } from 'react';
import css from './Button.module.css';
import cn from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button className={cn(css.button, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
