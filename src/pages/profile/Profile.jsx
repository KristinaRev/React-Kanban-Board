import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import css from './Profile.module.css';
import {Link} from "react-router-dom";

const Profile = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={css.profile}>
                <h1>Profile</h1>
                <Link to="/" className={css.link}>Назад к задачам</Link>
            </div>
        </DndProvider>
    );
};

export default Profile;

//todo выводить инфо по юзеру
//todo добавить метод удаления профиля
