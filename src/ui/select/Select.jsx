import React from 'react';
import css from './Select.module.css';

const Select = (props) => {
    const { options } = props;
    return (
        <select className={css.select} {...props}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
export default Select;

