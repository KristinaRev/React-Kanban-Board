import {useEffect, useRef, useContext, ChangeEvent, FC} from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import FormattedTitle from '../../ui/formatted-title/FormattedTitle';
import {StoreContext} from "../../stores/root.store";
import {observer} from "mobx-react-lite";
import {LIST_COPY, LIST_TYPES} from "../../config";
import Button from "../../ui/button/Button";
import Select from "../../ui/select/Select";
import {Textarea} from "../../ui/textarea/textarea";
import css from './TaskDetail.module.css';

const TaskDetail: FC = () => {
	const { taskId } = useParams<{ taskId: string }>();
	const { tasksStore } = useContext(StoreContext);

	const localDescription = tasksStore.taskDetail.description;
	const localStatus = tasksStore.taskDetail.status;
	const localTitle = tasksStore.taskDetail.title;
	const localPriority = tasksStore.taskDetail.priority;

	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (taskId) {
			tasksStore.getTask(taskId);
		}
	}, [tasksStore, taskId])

	useEffect(() => {
		if (descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [tasksStore.taskDetail]);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
		tasksStore.changeTaskDetailsValue(e);

	const addDescription = async () => {
		if(taskId) await tasksStore.updateTaskDescription(taskId, localDescription);
	};

	const changeStatus = async () => {
		if(taskId) await tasksStore.updateTaskStatus(taskId, localStatus);
	};

	const changePriority = async () => {
		if(taskId) await tasksStore.updateTaskPriority(taskId, localPriority);
	};

	const handleBtnClick = async () => {
		if (!tasksStore.taskDetail.isDeleted && taskId) {
			await tasksStore.deleteTask(taskId);
		} else {
			await tasksStore.addTask(localTitle, localDescription, localStatus);
		}
		tasksStore.changeTaskDetailDeleted(!tasksStore.taskDetail.isDeleted);
	};

	const selectOptions = Object.values(LIST_TYPES).map((list) => ({
		value: list,
		label: LIST_COPY[list],
	}));

	const taskPriorities = Object.values(tasksStore.taskPriorities).map((list) => ({
		value: list,
		label: list,
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
						<Select
							options={taskPriorities}
							value={localPriority}
							onChange={handleChange}
							onBlur={changePriority}
							name='priority'
						/>
						<Textarea
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
