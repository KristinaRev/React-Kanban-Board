import { TextareaHTMLAttributes, FC } from 'react';
import css from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any; //todo: определить тип
}

export const Textarea: FC<TextareaProps> = (props) => {
  const { label, ...rest } = props;

  return (
    <>
      {label && <label>{label}</label>}
      <textarea className={css.input} {...rest} />
    </>
  );
};
