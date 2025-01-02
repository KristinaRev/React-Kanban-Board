import Button from '../../ui/button/Button';
import css from './Form.module.css';
import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children: React.ReactNode;
  submitText: string;
  error?: string | null;
}

export const Form: React.FC<FormProps> = ({ onSubmit, className, children, submitText, error }) => {
  return (
    <form onSubmit={onSubmit} className={`${css.form} ${className}`}>
      {children}
      {error && <div className={css.error}>{error}</div>}
      <Button type="submit">{submitText}</Button>
    </form>
  );
};
