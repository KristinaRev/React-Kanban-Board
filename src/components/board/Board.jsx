import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LIST_TYPES, LIST_COPY } from '../../config';
import List from '../list/List';
import boardReducer from '../board-reducer/BoardReducer';
import css from './Board.module.css';

const Board = ({ tasks, setTasks, user }) => {

	const onDeleteTask = (taskId) => {
		const updatedTasks = tasks.filter(task => task.id !== taskId);
		setTasks(updatedTasks);
	};

	const moveTask = (taskId, newStatus) => {
		const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task);
		setTasks(updatedTasks);

		const taskToUpdate = tasks.find(task => task.id === taskId);
		if (taskToUpdate) {
			fetch(`http://localhost:3001/tasks/${taskId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: newStatus }),
			})
				.then(response => {
					if (!response.ok) {
						throw new Error(`Error: ${response.statusText}`);
					}
				})
				.catch(error => console.error('Error updating task status on server:', error.message));
		}
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={css.board}>
				{Object.values(LIST_TYPES).map(type => (
					<List
						key={LIST_COPY[type]}
						type={type}
						title={LIST_COPY[type]}
						tasks={tasks.filter(task => task.status === type)}
						moveTask={moveTask}
						setTasks={setTasks}
						onDeleteTask={onDeleteTask}
						user={user}
					/>
				))}
			</div>
		</DndProvider>
	);
};

export default Board;
