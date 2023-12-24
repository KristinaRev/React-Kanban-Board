import css from './Header.module.css';

function Header({ onLogin, onLogout, user }) {
	return (
		<header className={css.header}>
			<h1 className={css.header_title}>Awesome Kanban Board</h1>
			{user ? (
				<>
					<p className={css.header_user}>Welcome, {user.username}!</p>
					<button onClick={onLogout} className={css.header_btn}>Log Out</button>
				</>
			) : (
				<button onClick={onLogin} className={css.header_btn}>Log In</button>
			)}
		</header>
	)
}

export default Header
