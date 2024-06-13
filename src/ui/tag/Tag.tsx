import {FC, PropsWithChildren} from 'react';
import css from './Tag.module.css';


const Tag: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={css.tag}>
            {children}
        </div>
    );
};

export default Tag;
