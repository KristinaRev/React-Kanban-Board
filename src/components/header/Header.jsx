import React, {memo, useEffect, useState} from 'react';
import Login from "../Login/Login";
import Portal from "../Portal";
import {root} from "../Portal/Portal";
import FormattedTitle from "../../ui/formatted-title/FormattedTitle";
import Button from "../../ui/button/Button";
import UserLogin from "../user-login/UserLogin";
import Register from "../register/Register";
import './Header.scss';

function Header({onLogin, onLogout, user}) {
	const [portalVisible, setPortalVisible] = useState(false);
	const [loginVisible, setLoginVisible] = useState(false);
	const [regVisible, setRegVisible] = useState(false);

	const handleWelcomeClick = () => {
		setPortalVisible(true);
	};

	const handleLoginClick = () => {
		setLoginVisible(true);
	}

	const handleRegClick = () => {
		setRegVisible(true);
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (root && !root.contains(event.target)) {
				setPortalVisible(false);
				setLoginVisible(false);
				setRegVisible(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	//todo вынести из хедера регистрацию и вход в компонент Login

	return (
		<header className="header">
			<h1 className="header_title">Awesome Kanban Board</h1>
			<Button onClick={handleLoginClick}>Вход</Button>
			<Button onClick={handleRegClick}>Регистрация</Button>
			{user && (
				<p className="header_user" onClick={handleWelcomeClick}>Welcome, {user}!</p>
			)}
			<Login onLogin={onLogin} onLogout={onLogout} user={user}/>
			{portalVisible && (
				<Portal className="MyPortal" element="span">
					<FormattedTitle title='Have a good day!' className="Title"/>
				</Portal>
			)}
			{loginVisible && (
				<Portal className="MyPortal">
					<UserLogin className="form"></UserLogin>
				</Portal>
			)}
			{regVisible && (
				<Portal className="MyPortal">
					<Register className="form"></Register>
				</Portal>
			)}
		</header>
	);
}

export default memo(Header);
