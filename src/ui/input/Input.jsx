import React from 'react';
import css from './Input.module.css';

const Input = (props) => {
    return (
        <>
            <label>{props.label}</label>
            {
                props.type === 'textarea' ? (
                    <textarea className={css.input} {...props} />
                ) : (
                    <input className={css.input} {...props} />
                )
            }
        </>
    );
};

export default Input;

