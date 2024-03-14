import React from 'react';
import css from './Button.module.css';

const Button = (props) => {
    return (
        <button className={css.button} {...props}>
            {props.children}
        </button>
    );
};

export default Button;
