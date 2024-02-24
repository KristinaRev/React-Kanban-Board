import React, { useState, useCallback } from 'react';
import { LIST_TYPES } from '../../config'
import FormAddNewTask from '../forms/FormAddNewTask'
import css from './List.module.css'
import { Link } from 'react-router-dom'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import Task from "../Task/Task";

const List = (props) => {
	const { type, title, tasks, addNewTask, moveTask, setTasks, formSubmit, onDeleteTask } = props;
	const [isFormVisible, setFormVisible] = useState(false)

	const handleAddNewClick = useCallback(() => {
		setFormVisible(!isFormVisible)
	}, [isFormVisible]);

	const formSubmitLocal = useCallback((title, description) => {
		formSubmit(title, description)
		addNewTask(title, description)
		setFormVisible(false)
	}, [formSubmit, addNewTask]);

	const [, drop] = useDrop({
		accept: ItemTypes.TASK,
		drop: (item) => moveTask(item.id, type),
	});

	const moveTaskInsideList = useCallback((dragIndex, hoverIndex) => {
		const updatedTasks = [...tasks];
		const [draggedTask] = updatedTasks.splice(dragIndex, 1);
		updatedTasks.splice(hoverIndex, 0, draggedTask);
		setTasks(updatedTasks);
	}, [tasks, setTasks]);

	const onDelete = (taskId) => {
		onDeleteTask(taskId);

		fetch(`http://localhost:3001/tasks/${taskId}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`)
				}
				console.log(`Task ${taskId} deleted successfully from server`);
			})
			.catch(error => console.error('Error deleting task from server:', error.message))
	};


	return (
		<div ref={drop} className={css.list}>
			<h2 className={css.listTitle}>{title}</h2>
			{tasks.length ?
				tasks.map((task, index) => (
					/* <Link key={task.id} to={`/tasks/${task.id}`}> */
						<Task
							key={task.id}
							index={index}
							id={task.id}
							title={task.title}
							status={task.status}
							moveTask={task.status === type ? moveTask : moveTaskInsideList}
							onDelete={onDelete}
						/>
					/*</Link>*/
				)) :
				<p>No tasks added yet</p>
			}
			{type === LIST_TYPES.BACKLOG && <button onClick={handleAddNewClick} className={css.addButton}>+ Add new task</button>}
			{type === LIST_TYPES.BACKLOG && isFormVisible && (
				<FormAddNewTask formSubmit={formSubmitLocal} />
			)}
		</div>
	);
};
export default List
