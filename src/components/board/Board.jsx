import React, {useContext} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LIST_TYPES, LIST_COPY } from '../../config';
import List from '../list/List';
// import boardReducer from '../board-reducer/BoardReducer';
import css from './Board.module.css';
import {StoreContext} from "../../stores/root.store";

const Board = ({ setTasks, user }) => {
	const {tasksStore} = useContext(StoreContext);

	const moveTask = async (taskId, newStatus) => {
		await tasksStore.changeTaskStatus(taskId, newStatus);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={css.board}>
				{Object.values(LIST_TYPES).map(type => (
					<List
						key={LIST_COPY[type]}
						type={type}
						title={LIST_COPY[type]}
						tasks={tasksStore.tasks.filter(task => task.status === type)}
						moveTask={moveTask}
						setTasks={setTasks}
						user={user}
					/>
				))}
			</div>
		</DndProvider>
	);
};

export default Board;
