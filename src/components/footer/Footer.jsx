import {LIST_TYPES, LIST_COPY} from '../../config'
import css from './Footer.module.css'
import useTaskCounter from "../../hooks/task-counter";

function Footer(props) {

	const {tasks} = props
	const taskCounts = useTaskCounter(tasks)

	return (
		<footer className={css.footer}>
			<div className={css.counts}>
				{Object.values(LIST_TYPES).map(type => {

					const count = taskCounts[type];

					if (!count) return null;

					return (
						<p className={css.count} key={LIST_COPY[type]}>{LIST_COPY[type]}: {count}</p>
					)
				})}
			</div>
			<div className={css.copy}>
				Created by <a href='https://github.com/KristinaRev' target='_blank' rel='noreferrer'>Kris Kipper</a> , 2023
			</div>
		</footer>
	)
}

export default Footer
