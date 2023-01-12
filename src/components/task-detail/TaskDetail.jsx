import { useParams, Link } from 'react-router-dom'
import { LIST_TYPES, LIST_COPY, LIST_COLORS } from '../../config'
import { formatDate } from '../../utils'
import notFoundIcon from '../../assets/not-found.svg'
import css from './TaskDetail.module.css'
import data from '../../mock.json'

const TaskDetail = (props) => {

	const {id} = useParams();
	const task = data[id];
	const {tasks, setTasks} = props

	const handleChange = (e) => {
		const newStatus = e.target.value
		const updatedTasks = tasks.map(task => {
			if (task.id === task) {
				return {...task, status: newStatus}
			}
			return task
		})
		setTasks(updatedTasks)
	}

	const renderTaskDetails = () => {
		return (
			<>
				<div className={css.header}>
					<h2 className={css.title}>{task.title}</h2>
					<p className={css.status} style={{background: LIST_COLORS[task.status]}}>{LIST_COPY[task.status]}</p>
				</div>
				<p className={css.createdAt}>Created at: {formatDate(task.created)}</p>
				<p>Description: {task.description || '(no description)'}</p>
				<p className={css.label}>Change status:</p>
				<select className={css.select} onChange={handleChange} value={task.status}>
					{Object.values(LIST_TYPES).map(list => {
						return <option key={list} value={list}>{LIST_COPY[list]}</option>
					})}
				</select>
			</>
		)
	}

	const renderEmptyState = () => {
		return (
			<div className={css.emptyState}>
				<h2>Task with ID <em>123</em> was not found</h2>
				<img className={css.emptyStateIcon} src={notFoundIcon} alt='' />
			</div>
		)
	}

	return (
		<>
			<Link to='/' className={css.homeLink}>&#8592; Back</Link>
			<div className={css.wrapper}>
				{task ? renderTaskDetails() : renderEmptyState()}
			</div>
		</>
	)
}

export default TaskDetail

