import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import css from './Reg.module.css';
import Register from "../../components/register/Register";

const Reg = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={css.Reg}>
                <h1>Регистрация</h1>
                <Register className={css.Form}></Register>
            </div>
        </DndProvider>
    );
};

export default Reg;
