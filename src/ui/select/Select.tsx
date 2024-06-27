import { SelectHTMLAttributes, FC } from 'react';
import cn from 'classnames';
import css from './Select.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  className?: string;
}

const Select: FC<SelectProps> = ({ label, options, className, ...rest }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <select className={cn(css.select, className)} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
