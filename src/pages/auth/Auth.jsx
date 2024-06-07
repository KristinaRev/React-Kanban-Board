import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import css from './Auth.module.css';
import {Link} from "react-router-dom";
import UserLogin from "../../components/user-login/UserLogin";

const Auth = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={css.Auth}>
                <h1>Войдите в учетную запись</h1>
                <UserLogin className="form"></UserLogin>
            </div>
        </DndProvider>
    );
};

export default Auth;
