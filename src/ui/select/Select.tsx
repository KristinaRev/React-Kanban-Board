import { SelectHTMLAttributes, FC } from 'react';
import css from './Select.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select: FC<SelectProps> = ({ label, options, ...rest }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <select className={css.select} {...rest}>
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
