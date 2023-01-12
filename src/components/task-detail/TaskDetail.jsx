import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { LIST_TYPES, LIST_COPY, LIST_COLORS } from '../../config'
import { formatDate } from '../../utils'
import notFoundIcon from '../../assets/not-found.svg'
import css from './TaskDetail.module.css'
import { ReactComponent as CloseDetails } from '../../assets/closeDetails.svg';

const TaskDetail = ({ tasks, setTasks }) => {


	const { taskId } = useParams();
    const task = JSON.parse(window.localStorage.getItem('tasks')).find(task => task.id === taskId)

    const [description, setDescription] = useState(task.description ? task.description : "This task has no description");

	const addDescription = () => {
		const tasksCopy = tasks.map(el => {
		  if (el.id === task.id) {
			el.description = description
		  }
		  return el
		})
		setTasks(tasksCopy);
	  }

	  const handleChange = (e) => {
		const newStatus = e.target.value
		const updatedTasks = tasks.map(task => {
			if (task.id === taskId) {
				return {...task, status: newStatus}
			}
			return task
		})
		setTasks(updatedTasks)
	}
	
	  return (
		<div >
		  {task ? (
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
		  ) : (<div  >
			<h2 >Task with ID {taskId} not found</h2>
			<Link to='/'>
			  <CloseDetails  />
			</Link>
		  </div>
		  )
		  }
		</div >
	  );
	}
	
	export default TaskDetail;

