import { useState } from 'react'
import { LIST_TYPES} from '../../config'
import FormAddNewTask from '../forms/FormAddNewTask'
import css from './List.module.css'
import { Link } from 'react-router-dom'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import Task from "../Task/Task";

const List = (props) => {
	const { type, title, tasks, addNewTask, moveTask, setTasks, formSubmit } = props
	const [isFormVisible, setFormVisible] = useState(false)

	const handleAddNewClick = () => {
		setFormVisible(!isFormVisible)
	}

	const formSubmitLocal = (title, description) => {
		addNewTask(title, description)
		setFormVisible(false)
	}

	const [, drop] = useDrop({
		accept: ItemTypes.TASK,
		drop: (item) => moveTask(item.id, type),
	});

	const moveTaskInsideList = (dragIndex, hoverIndex) => {
		const updatedTasks = [...tasks];
		const [draggedTask] = updatedTasks.splice(dragIndex, 1);
		updatedTasks.splice(hoverIndex, 0, draggedTask);
		setTasks(updatedTasks);
	};

	return (
		<div ref={drop} className={css.list}>
			<h2 className={css.listTitle}>{title}</h2>
			{tasks.length ?
				tasks.map((task, index) => (
					<Link  to={`/tasks/${task.id}`}>
						<Task
							key={task.id}
							index={index}
							id={task.id}
							title={task.title}
							status={task.status}
							moveTask={task.status === type ? moveTask : moveTaskInsideList}
						/>
					</Link>
					)
				) :
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
