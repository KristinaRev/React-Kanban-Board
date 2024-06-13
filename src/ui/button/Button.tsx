import {ButtonHTMLAttributes, FC} from 'react';
import css from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: string | undefined;
}

const Button: FC<ButtonProps> = (props) => {
    return (
        <button className={css.button} {...props}>
            {props.children}
        </button>
    );
};

export default Button;
