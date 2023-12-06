import Board from '../board/Board'
import css from './Main.module.css'

import { Routes, Route } from "react-router-dom";
import TaskDetail from '../task-detail/TaskDetail';

const Main = (props) => {


	return (
		<main className={css.main}>
			<Routes>
				<Route exact path={'/'} element={<Board {...props} />} />
				<Route path={'/tasks/:taskId'} element={<TaskDetail {...props} />} />
			</Routes>
		</main>
	);
};


export default Main
