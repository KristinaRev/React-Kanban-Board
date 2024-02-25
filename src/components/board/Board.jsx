// import uniqid from 'uniqid'
import { useId } from 'react-id-generator';
import { LIST_TYPES, LIST_COPY } from '../../config'
import List from '../list/List'
import css from './Board.module.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Task from "../Task/Task"

const Board = (props) => {
	const { tasks, setTasks, formSubmit } = props
	const generateId = useId();

	const addNewTask = (title, description) => {
		const task = {
			id: generateId,
			title,
			description,
			created: new Date().toISOString(),
			status: 'backlog',
		}

		setTasks([...tasks, task])
	}

	const onDeleteTask = (taskId) => {
		const updatedTasks = tasks.filter(task => task.id !== taskId);
		setTasks(updatedTasks);
	};

	// console.log('Board tasks:', tasks)

	const moveTask = (taskId, newStatus) => {

		const updatedTasks = tasks.map((task) => {
			if (task.id === taskId) {
				return { ...task, status: newStatus }
			}
			return task
		})

		setTasks(updatedTasks)


		const taskToUpdate = tasks.find(task => task.id === taskId)
		if (taskToUpdate) {
			fetch(`http://localhost:3001/tasks/${taskId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: newStatus }),
			})
				.then(response => {
					if (!response.ok) {
						throw new Error(`Error: ${response.statusText}`)
					}
					// console.log(`Task ${taskId} status updated on server`)
				})
				.catch(error => console.error('Error updating task status on server:', error.message))
		}
	}

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
						onDeleteTask={onDeleteTask}
					/>
				))}
			</div>
		</DndProvider>
	)
}

export default Board
