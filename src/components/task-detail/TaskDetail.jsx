import React, {useEffect, useRef, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import FormattedTitle from '../formatted-title/FormattedTitle';
import {StoreContext} from "../../stores/root.store";
import {observer} from "mobx-react-lite";
import css from './TaskDetail.module.css';

const TaskDetail = ({ tasks, setTasks }) => {
	const { taskId } = useParams();
	const {tasksStore} = useContext(StoreContext);
	const localDescription = tasksStore.taskDetail.description;
	const descriptionRef = useRef(null);

	useEffect(() => {
		tasksStore.getTask(taskId);
	}, [taskId]);

	useEffect(() => {
		if (descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [tasksStore.taskDetail]);

	const handleChange = e => tasksStore.changeTaskDetailsValue(e);

	const addDescription = async () => {
		await tasksStore.updateTaskDescription(taskId, localDescription);
	};

	return (
		<div className={css.details_wrapper}>
			<div className={css.details}>
				{tasksStore.taskDetail.title ? (
					<>
						<div className={css.details_header}>
							<FormattedTitle title={tasksStore.taskDetail.title} className={css.title} />
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
						<h2 className={css.details_title}>Задача с ID {taskId} не найдена</h2>
						<Link to='/'>
							<FaTimes className={css.details_close_btn} />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

const ObservedTaskDetail = observer(TaskDetail);
export default ObservedTaskDetail;


/* <select className={css.select} onChange={handleChange} value={task.status}>
{Object.values(LIST_TYPES).map(list => {
	return <option key={list} value={list}>{LIST_COPY[list]}</option>
})}
</select> */

