import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import css from './TaskDetail.module.css';
import { ReactComponent as CloseDetails } from '../../assets/closeDetails.svg';
import { FaTimes } from 'react-icons/fa';
import FormattedTitle from "../formatted-title/FormattedTitle";

const TaskDetail = ({ tasks, setTasks }) => {
	const { taskId } = useParams();
	const [task, setTask] = useState(null);
	const [description, setDescription] = useState('');
	const descriptionRef = useRef(null);

	useEffect(() => {
		fetch(`http://localhost:3001/tasks/${taskId}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				return response.json();
			})
			.then(data => {
				setTask(data);
				setDescription(data.description || "This task has no description");
			})
			.catch(error => console.error('Error fetching task details:', error.message));
	}, [taskId]);

	useLayoutEffect(() => {
		// Фокусировка на поле ввода описания задачи после отображения компонента
		if (descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [task]);

	const handleChange = (e) => {
		const newStatus = e.target.value
		const updatedTasks = tasks.map(task => {
			if (task.id === taskId) {
				return { ...task, status: newStatus }
			}
			return task
		})
		setTasks(updatedTasks)
	}

	const addDescription = () => {
		const tasksCopy = tasks.map(el => {
			if (el.id === task.id) {
				el.description = description
			}
			return el
		})
		setTasks(tasksCopy);
	}

	return (
		<div className={css.details_wrapper}>
			<div className={css.details}>
			{task ? (
				<>
					<div className={css.details_header}>
						<FormattedTitle title={task.title} className={css.title}/>
						<Link to='/'>
							<FaTimes className={css.details_close_btn} />
						</Link>
					</div>
					<textarea
						ref={descriptionRef}
						className={css.details_description}
						onChange={(e) => { setDescription(e.target.value) }}
						onFocus={() => { description === "This task has no description" && setDescription('') }}
						onBlur={addDescription}
						value={description} />

				</>
			) : (
				<div className={css.details_not_found} >
					<h2 className={css.details_title}>Task with ID {taskId} not found</h2>
					<Link to='/'>
						<CloseDetails className={css.details_close_btn} />
					</Link>
				</div>
			)}
			</div>
		</div >
	);
}
export default TaskDetail;


/* <select className={css.select} onChange={handleChange} value={task.status}>
{Object.values(LIST_TYPES).map(list => {
	return <option key={list} value={list}>{LIST_COPY[list]}</option>
})}
</select> */

