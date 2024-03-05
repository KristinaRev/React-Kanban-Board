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
	const [localDescription, setLocalDescription] = useState(''); // Новое состояние для отслеживания локальных изменений описания задачи
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
				setLocalDescription(data.description || "This task has no description"); // Устанавливаем начальное локальное описание
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
		setLocalDescription(e.target.value);
	}

	const addDescription = () => {
		const updatedTasks = tasks.map(task => {
			if (task.id === taskId) {
				task.description = localDescription; // Обновляем локальное описание в задаче
				fetch(`http://localhost:3001/tasks/${taskId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ description: localDescription }), // Отправляем новое описание на сервер
				})
					.then(response => {
						if (!response.ok) {
							throw new Error(`Error: ${response.statusText}`);
						}
						// console.log(`Task ${taskId} description updated on server`);
					})
					.catch(error => console.error('Error updating task description on server:', error.message));
			}
			return task;
		});
		setTasks(updatedTasks);
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
							onChange={handleChange}
							onBlur={addDescription}
							value={localDescription} /> {/* Используем локальное описание вместо описания из состояния */}
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

