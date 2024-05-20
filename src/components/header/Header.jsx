import React, {memo, useEffect, useState} from 'react';
import Login from "../Login/Login";
import Portal from "../Portal";
import {root} from "../Portal/Portal";
import FormattedTitle from "../../ui/formatted-title/FormattedTitle";
import './Header.scss';

function Header({onLogin, onLogout, user}) {
	const [portalVisible, setPortalVisible] = useState(false);

	const handleWelcomeClick = () => {
		setPortalVisible(true);
	};


	useEffect(() => {
		function handleClickOutside(event) {
			if (root && !root.contains(event.target)) {
				setPortalVisible(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);



	return (
		<header className="header">
			<h1 className="header_title">Awesome Kanban Board</h1>
			{user && (
				<p className="header_user" onClick={handleWelcomeClick}>Welcome, {user}!</p>
			)}
			<Login onLogin={onLogin} onLogout={onLogout} user={user}/>
			{portalVisible && (
				<Portal className="MyPortal" element="span">
					<FormattedTitle title='Have a good day!' className="Title"/>
				</Portal>
			)}
		</header>
	);
}

export default memo(Header);
