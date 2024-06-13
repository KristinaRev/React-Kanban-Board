import { InputHTMLAttributes, TextareaHTMLAttributes, FC } from 'react';
import css from './Input.module.css';

interface BaseProps {
    label: string;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
    type?: 'text' | 'password' | 'email' | 'number';
}

interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
    type: 'textarea';
}

type Props = InputProps | TextareaProps;

const Input: FC<Props> = (props) => {
    const { label, type, ...rest } = props;

    return (
        <>
            <label>{label}</label>
            {type === 'textarea' ? (
                <textarea className={css.input} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
            ) : (
                <input className={css.input} type={type} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
            )}
        </>
    );
};

export default Input;

