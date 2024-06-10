import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserLogin from "../../components/user-login/UserLogin";
import css from './Auth.module.css';

const Auth: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={css.Auth}>
                <h1>Войдите в учетную запись</h1>
                <UserLogin className={css.form} />
            </div>
        </DndProvider>
    );
};

export default Auth;
