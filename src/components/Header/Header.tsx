import { FC, useContext, useEffect, useState } from 'react';
import Login from '../Login/Login';
import Portal from '../Portal';
import { root } from '../Portal/Portal';
import FormattedTitle from '../../ui/formatted-title/FormattedTitle';
import { StoreContext } from '../../stores/root.store';
import { observer } from 'mobx-react-lite';
import css from './Header.module.css';

type HeaderProps = {
  onLogout: () => void;
};

const Header: FC<HeaderProps> = ({ onLogout }) => {
  const { usersStore } = useContext(StoreContext);
  const [portalVisible, setPortalVisible] = useState(false);

  // todo: const handleWelcomeClick = () => {
  //   setPortalVisible(true);
  // };

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
    <header className={css.header}>
      <h1 className={css.header_title}>Awesome Kanban Board</h1>
      {usersStore.login && (
        <p className={css.header_user} onClick={() => setPortalVisible(true)}>
          Welcome, {usersStore.currentUser?.fullName}!
        </p>
      )}
      <Login onLogout={onLogout} />
      {portalVisible && (
        <Portal className={css.MyPortal} element="span">
          <FormattedTitle title="Have a good day!" className={css.Title} />
        </Portal>
      )}
    </header>
  );
};

export default observer(Header);
