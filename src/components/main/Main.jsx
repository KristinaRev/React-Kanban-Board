import React from 'react';
import { Routes, Route } from "react-router-dom";
import Board from '../../pages/board/Board';
import TaskDetail from '../../pages/task-detail/TaskDetail';
import PortalPage from "../../pages/PortalPage";
import {ROUTES} from "../../routes";
import Profile from "../../pages/profile/Profile";
import Auth from "../../pages/auth/Auth";
import Reg from "../../pages/reg/Reg";
import css from './Main.module.css';


const Main = (props) => {
	return (
		<main className={css.main}>
			<Routes>
				<Route exact path={'/'} element={<Board {...props} />} />
				<Route path={'/tasks/:taskId'} element={<TaskDetail {...props} />} />
				<Route path={ROUTES.PORTAL} element={<PortalPage {...props} />}/>
				<Route path={ROUTES.PROFILE} element={<Profile {...props} />} />
				<Route path={ROUTES.AUTHORIZATION} element={<Auth {...props} />} />
				<Route path={ROUTES.REGISTRATION} element={<Reg {...props} />} />
			</Routes>
		</main>
	);
};

export default Main;
