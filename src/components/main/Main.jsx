
import Board from '../board/Board'
import css from './Main.module.css'

const Main = (props) => {
	return (
		<main className={css.main}>
			<Board {...props} />
				
		</main>
	)
}

export default Main
