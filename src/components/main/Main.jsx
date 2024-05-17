import React from 'react';
import { Routes, Route } from "react-router-dom";
import Board from '../../pages/board/Board';
import TaskDetail from '../../pages/task-detail/TaskDetail';
import PortalPage from "../../pages/PortalPage";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import css from './Main.module.css';
import {ROUTES} from "../../routes";
import Profile from "../../pages/profile/Profile";

const Main = (props) => {
	return (
		<main className={css.main}>
			<Routes>
				<Route exact path={'/'} element={<Board {...props} />} />
				<Route path={'/tasks/:taskId'} element={<TaskDetail {...props} />} />
				<Route path={ROUTES.PORTAL} element={<PortalPage {...props} />}/>
				<Route path={ROUTES.PROFILE} element={<Profile {...props} />} />
			</Routes>
		</main>
	);
};

export default Main;
