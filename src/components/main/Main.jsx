import React from 'react';
import { Routes, Route } from "react-router-dom";
import Board from '../board/Board';
import TaskDetail from '../task-detail/TaskDetail';
import PortalPage from "../PortalPage";
import css from './Main.module.css';
import {ROUTES} from "../../routes";

const Main = (props) => {
	return (
		<main className={css.main}>
			<Routes>
				<Route exact path={'/'} element={<Board {...props} />} />
				<Route path={'/tasks/:taskId'} element={<TaskDetail {...props} />} />
				<Route path={ROUTES.PORTAL} element={<PortalPage {...props} />}/>
			</Routes>
		</main>
	);
};

export default Main;
