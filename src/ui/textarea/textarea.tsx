import { TextareaHTMLAttributes, FC } from 'react';
import css from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    ref?: any; //todo: определить тип
}

export const Textarea: FC<TextareaProps> = (props) => {
    const { label,  ...rest } = props;

    return (
        <>
            {label && <label>{label}</label>}
            <textarea className={css.input} {...rest} />
        </>
    );
};
