import css from './Header.module.css';
import Button from "../button/Button";

function Header({ onLogin, onLogout, user }) {
	return (
		<header className={css.header}>
			<h1 className={css.header_title}>Awesome Kanban Board</h1>
			{user ? (
				<>
					<p className={css.header_user}>Welcome, user!</p>
					<Button onClick={onLogout} className={css.header_btn}>
						Log Out
					</Button>
				</>
			) : (
				<Button onClick={onLogin} className={css.header_btn}>
					Log In
				</Button>

			)}
		</header>
	)
}

export default Header
