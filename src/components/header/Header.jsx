import React, { memo } from 'react';
import Login from "../Login/Login";
import css from './Header.module.css';

function Header({ onLogin, onLogout, user }) {

	return (
		<header className={css.header}>
			<h1 className={css.header_title}>Awesome Kanban Board</h1>
			{user ? <p className={css.header_user}>Welcome, {user}!</p> : ''}
			<Login onLogin={onLogin} onLogout={onLogout} user={user}/>
		</header>
	);
}

export default memo(Header);
