import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import FormattedTitle from '../formatted-title/FormattedTitle';
import css from './TaskDetail.module.css';
import {useDispatch} from "react-redux";

const TaskDetail = ({ tasks, setTasks }) => {
	const { taskId } = useParams();
	const [task, setTask] = useState(null);
	const [localDescription, setLocalDescription] = useState('');
	const descriptionRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchTask = async () => {
			try {
				const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const data = await response.json();
				setTask(data);
				setLocalDescription(data.description || "This task has no description");
			} catch (error) {
				console.error('Error fetching task details:', error.message);
			}
		};
		fetchTask();
	}, [taskId]);

	useEffect(() => {
		if (descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [task]);

	const handleChange = (e) => {
		setLocalDescription(e.target.value);
	};

	const addDescription = async () => {
		try {
			const updatedTasks = tasks.map(task => {
				if (task.id === taskId) {
					task.description = localDescription;
				}
				return task;
			});
			dispatch(setTasks(updatedTasks))

			const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ description: localDescription }),
			});
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
		} catch (error) {
			console.error('Error updating task description on server:', error.message);
		}
	};

	return (
		<div className={css.details_wrapper}>
			<div className={css.details}>
				{task ? (
					<>
						<div className={css.details_header}>
							<FormattedTitle title={task.title} className={css.title} />
							<Link to='/'>
								<FaTimes className={css.details_close_btn} />
							</Link>
						</div>
						<textarea
							ref={descriptionRef}
							className={css.details_description}
							onChange={handleChange}
							onBlur={addDescription}
							value={localDescription} />
					</>
				) : (
					<div className={css.details_not_found}>
						<h2 className={css.details_title}>Task with ID {taskId} not found</h2>
						<Link to='/'>
							<FaTimes className={css.details_close_btn} />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskDetail;


/* <select className={css.select} onChange={handleChange} value={task.status}>
{Object.values(LIST_TYPES).map(list => {
	return <option key={list} value={list}>{LIST_COPY[list]}</option>
})}
</select> */

