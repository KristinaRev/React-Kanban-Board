import React from 'react';
import css from './Tag.module.css';

const Tag = (props) => {
    return (
        <div className={css.tag} {...props}>
            {props.children}
        </div>
    );
};

export default Tag;
