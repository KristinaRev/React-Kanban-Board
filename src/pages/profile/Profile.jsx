import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormattedTitle from "../../ui/formatted-title/FormattedTitle";
import css from './Profile.module.css';
import {Link} from "react-router-dom";

const Profile = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={css.profile}>
                <span>Profile</span>
                <Link to="/" className={css.link}>Назад к задачам</Link>
            </div>
        </DndProvider>
    );
};

export default Profile;
