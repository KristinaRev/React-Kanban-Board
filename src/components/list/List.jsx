import React, {useState, useCallback, useMemo, useContext} from 'react';
import { useTransition, animated } from 'react-spring';
import { useDrag, useDrop } from 'react-dnd';
import { LIST_TYPES } from '../../config';
import { ItemTypes } from '../../ItemTypes';
import FormAddNewTask from '../forms/FormAddNewTask';
import Task from "../Task/Task";
import css from './List.module.css';
import {StoreContext} from "../../stores/root.store";
import {observer} from "mobx-react-lite";

const List = (props) => {
	const { type, title, tasks, user } = props;
	const {tasksStore} = useContext(StoreContext);

	const handleAddNewClick = () => {
		tasksStore.changeFormVisible(!tasksStore.taskForm.isVisible);
	}

	const moveTask = async (taskId, newStatus) => {
		await tasksStore.changeTaskStatus(taskId, newStatus);
	};

	const moveTaskInsideList = (dragIndex, hoverIndex) => {
		tasksStore.replaceListTasks(dragIndex, hoverIndex);
	};

	// 	// Сортировка задач по названию
	// const sortedTasks = useMemo(() => {
	// 	return tasks.sort((a, b) => a.title.localeCompare(b.title));
	// }, [tasks]);

	const [, drop] = useDrop({
		accept: ItemTypes.TASK,
		drop: (item) => moveTask(item.id, type),
	});

	const transitions = useTransition(tasksStore.taskForm.isVisible, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: { duration: 500 },
		onDestroyed: (isVisible) => {
			if (!isVisible) {
				tasksStore.changeFormVisible(true);
			}
		}
	});

	return (
		<div ref={drop} className={css.list}>
			<h2 className={css.listTitle}>{title}</h2>
			{tasks.length ? (
				tasks.map((task, index) => (
					<Task
						key={task.id}
						index={index}
						id={task.id}
						title={task.title}
						status={task.status}
						priority={task.priority}
						moveTask={task.status === type ? moveTask : moveTaskInsideList}
					/>
				))
			) : (
				<p>No tasks added yet</p>
			)}
			{type === LIST_TYPES.BACKLOG && user && (
				<button onClick={handleAddNewClick} className={css.addButton}>+ Add new task</button>
			)}
			{transitions((style, item) => item && user && type === LIST_TYPES.BACKLOG && (
				<animated.div style={style}>
					<FormAddNewTask/>
				</animated.div>
			))}
		</div>
	);
};

export default observer(List);

