
import Login from '../Login/Login'
import css from './Header.module.css'

function Header() {
	return (
		<header className={css.header}>
			<h1 className={css.header_title}>Awesome Kanban Board</h1>
			<Login/>
		</header>
	)
}

export default Header
