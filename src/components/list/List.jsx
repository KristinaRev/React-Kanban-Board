import React, { useState, useCallback, useMemo } from 'react';
import { useTransition, animated } from 'react-spring';
import { useDrag, useDrop } from 'react-dnd';
import { LIST_TYPES } from '../../config';
import { ItemTypes } from '../../ItemTypes';
import FormAddNewTask from '../forms/FormAddNewTask';
import Task from "../Task/Task";
import css from './List.module.css';

const List = (props) => {
	const { type, title, tasks, moveTask, setTasks, onDeleteTask, user } = props;
	const [isFormVisible, setFormVisible] = useState(false);

	const handleAddNewClick = useCallback(() => {
		setFormVisible(!isFormVisible);
	}, [isFormVisible]);

	const sortedTasks = useMemo(() => {
		// Сортировка задач по названию
		return tasks.sort((a, b) => a.title.localeCompare(b.title));
	}, [tasks]);

	const formSubmitLocal = useCallback(() => {
		setFormVisible(false)
	}, []);

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

	const transitions = useTransition(isFormVisible, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: { duration: 500 },
		onDestroyed: (isVisible) => {
			if (!isVisible) {
				setFormVisible(true);
			}
		}
	});

	return (
		<div ref={drop} className={css.list}>
			<h2 className={css.listTitle}>{title}</h2>
			{tasks.length ? (
				sortedTasks.map((task, index) => (
					<Task
						key={task.id}
						index={index}
						id={task.id}
						title={task.title}
						status={task.status}
						moveTask={task.status === type ? moveTask : moveTaskInsideList}
						onDelete={onDelete}
					/>
				))
			) : (
				<p>No tasks added yet</p>
			)}
			{type === LIST_TYPES.BACKLOG && user && (
				<button onClick={handleAddNewClick} className={css.addButton}>+ Add new task</button>
			)}
			{transitions((style, item) => item && user && (
				<animated.div style={style}>
					<FormAddNewTask formSubmitLocal={formSubmitLocal} tasks={tasks} setTasks={setTasks}/>
				</animated.div>
			))}
		</div>
	);
};

export default List;

