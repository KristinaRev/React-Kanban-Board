import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import FormattedTitle from '../formatted-title/FormattedTitle';
import css from './TaskDetail.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
	clearTaskDetail,
	setNewDescriptionTaskServer,
	setTaskDetailDescription,
	setTaskDetailServer
} from "../../reducers/tasksSlice";

const TaskDetail = ({ tasks, setTasks }) => {
	const { taskId } = useParams();
	const descriptionRef = useRef(null);
	const dispatch = useDispatch();

	const task = useSelector((state) => {
		return state.tasks.taskDetail;
	})

	useEffect(() => {
		dispatch(setTaskDetailServer(taskId))
	}, [taskId]);

	useEffect(() => {
		if (descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [task]);

	const handleChange = (e) => {
		dispatch(setTaskDetailDescription(e.target.value));
	};

	const addDescription = async () => {
		dispatch(setNewDescriptionTaskServer({taskId: taskId, localDescription: task.description}))
		dispatch(clearTaskDetail())
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
							value={task.description} />
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

