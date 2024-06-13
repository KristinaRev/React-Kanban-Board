import { InputHTMLAttributes, FC } from 'react';
import css from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: 'text' | 'password' | 'email' | 'number';
    label?: string;
}

const Input: FC<InputProps> = (props) => {
    const { label, type, ...rest } = props;

    return (
        <>
            <label>{label}</label>
            <input className={css.input} type={type} {...rest} />
        </>
    );
};

export default Input;

