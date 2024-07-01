import { InputHTMLAttributes, FC } from 'react';
import cn from 'classnames';
import css from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email' | 'number';
  label?: string;
  className?: string;
}

const Input: FC<InputProps> = (props) => {
  const { label, type, className, ...rest } = props;

  return (
    <>
      <label>{label}</label>
      <input className={cn(css.input, className)} type={type} {...rest} />
    </>
  );
};

export default Input;
