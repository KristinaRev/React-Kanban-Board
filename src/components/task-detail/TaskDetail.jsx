import React, {useEffect, useRef, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import FormattedTitle from '../../ui/formatted-title/FormattedTitle';
import {StoreContext} from "../../stores/root.store";
import {observer} from "mobx-react-lite";
import {LIST_COPY, LIST_TYPES} from "../../config";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import css from './TaskDetail.module.css';
import Select from "../../ui/select/Select";

const TaskDetail = () => {
	const { taskId } = useParams();
	const {tasksStore} = useContext(StoreContext);
	const localDescription = tasksStore.taskDetail.description;
	const localStatus = tasksStore.taskDetail.status;
	const localTitle = tasksStore.taskDetail.title;
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

	const changeStatus = async () => {
		await tasksStore.updateTaskStatus(taskId, localStatus);
	};

	const handleBtnClick = async () => {
		if (!tasksStore.taskDetail.isDeleted) {
			await tasksStore.deleteTask(taskId);
		} else {
			await tasksStore.addTask(localTitle, localDescription, localStatus)
		}
		tasksStore.changeTaskDetailDeleted(!tasksStore.taskDetail.isDeleted);
	};

	const selectOptions = Object.values(LIST_TYPES).map(list => ({
		value: list,
		label: LIST_COPY[list],
	}));

	return (
		<div className={css.details_wrapper}>
			<div className={css.details}>
				{tasksStore.taskDetail.title ? (
					<>
						<div className={css.details_header}>
							<FormattedTitle title={tasksStore.taskDetail.title} className={css.title}/>
							<Link to='/'>
								<FaTimes className={css.details_close_btn}/>
							</Link>
						</div>
						<Select
							options={selectOptions}
							value={localStatus}
							onChange={handleChange}
							onBlur={changeStatus}
							name='status'
						/>
						<Input
							type='textarea'
							ref={descriptionRef}
							className={css.details_description}
							onChange={handleChange}
							onBlur={addDescription}
							value={localDescription}
							name='description'
						/>
						<Button type="button" onClick={handleBtnClick}>
							<FormattedTitle
								title={tasksStore.taskDetail.isDeleted ? 'Восстановить задачу' : 'Удалить задачу'}
								className="delete-btn"></FormattedTitle>
						</Button>
					</>
				) : (
					<div className={css.details_not_found}>
						<h2 className={css.details_title}>Задача с ID {taskId} не найдена</h2>
						<Link to='/'>
							<FaTimes className={css.details_close_btn}/>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default observer(TaskDetail);
