import {FC, useContext, useEffect, useState} from 'react';
import Login from "../Login/Login";
import Portal from "../Portal";
import {root} from "../Portal/Portal";
import FormattedTitle from "../../ui/formatted-title/FormattedTitle";
import './Header.scss';
import {StoreContext} from "../../stores/root.store";
import {observer} from "mobx-react-lite";

type HeaderProps = {
	onLogout: () => void;
};

const Header: FC<HeaderProps> = ({onLogout}) => {
	const { usersStore } = useContext(StoreContext);
	const [portalVisible, setPortalVisible] = useState(false);

	const handleWelcomeClick = () => {
		setPortalVisible(true);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (root && e.target instanceof Node && !root.contains(e.target)) {
				setPortalVisible(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<header className="header">
			<h1 className="header_title">Awesome Kanban Board</h1>
			{usersStore.login && (
				<p className="header_user" onClick={onLogout}>Welcome, {usersStore.currentUser?.fullName}!</p>
			)}
			<Login onLogout={onLogout}/>
			{portalVisible && (
				<Portal className="MyPortal" element="span">
					<FormattedTitle title='Have a good day!' className="Title"/>
				</Portal>
			)}
		</header>
	);
}

export default observer(Header);
