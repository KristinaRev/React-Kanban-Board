import uniqid from 'uniqid'
import {LIST_TYPES, LIST_COPY} from '../../config'
import List from '../list/List'
import css from './Board.module.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Task from "../Task/Task";

const Board = (props) => {
	const { tasks, setTasks, formSubmit } = props

	const addNewTask = (title, description) => {
		const task = {
			id: uniqid(),
			title,
			description,
			created: new Date().toISOString(),
			status: 'backlog',
		}

		setTasks([...tasks, task]);
	}

	console.log('Board tasks:', tasks);

	const moveTask = (taskId, newStatus) => {
		const updatedTasks = tasks.map((task) => {
			if (task.id === taskId) {
				return { ...task, status: newStatus };
			}
			return task;
		});

		setTasks(updatedTasks);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={css.board}>
				{Object.values(LIST_TYPES).map((type) => (
					<List
						key={LIST_COPY[type]}
						type={type}
						title={LIST_COPY[type]}
						tasks={tasks.filter((task) => task.status === type)}
						addNewTask={addNewTask}
						moveTask={moveTask}
						setTasks={setTasks}
						formSubmit={formSubmit}
					/>
				))}
			</div>
		</DndProvider>
	);
}

export default Board
