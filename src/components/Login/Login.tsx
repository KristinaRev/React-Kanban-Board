import { useContext, useState } from 'react';
import Button from '../../ui/button/Button';
import UserAvatar from '../../assets/user-menu.png';
import { Link } from 'react-router-dom';
import { useDelayUnmount } from '../../hooks/useDelayUnmount';
import { StoreContext } from '../../stores/root.store';
import { ROUTES } from '../../constants';
import css from './Login.module.css';

const mountedcss = { animation: 'inAnimation 250ms ease-in' };
const unmountedcss = {
  animation: 'outAnimation 270ms ease-out',
  animationFillMode: 'forwards'
};

interface LoginProps {
  onLogout?: () => void;
}

export default function Login({ onLogout }: LoginProps) {
  const { usersStore } = useContext(StoreContext);
  const [isMounted, setIsMounted] = useState(false);
  const showDiv = useDelayUnmount(isMounted, 250);
  const iconClass: string = isMounted ? 'icon isopen' : 'icon';

  const toggleIsMounted = () => setIsMounted((prevIsMounted) => !prevIsMounted);

  return (
    <div className={css.login_wrapper} onClick={toggleIsMounted}>
      <img src={UserAvatar} alt="user avatar" className={css.user_avatar} />
      <div className={iconClass} />
      {showDiv && (
        <div className={css.login_dropdown} style={isMounted ? mountedcss : unmountedcss}>
          <Link to={`/profile`} className={css.login_dropdown_button}>
            Profile
          </Link>
          {usersStore.login ? (
            <Button className={css.login_dropdown_button} onClick={onLogout}>
              Log Out
            </Button>
          ) : (
            <Link to={ROUTES.AUTHORIZATION} className={css.login_dropdown_button}>
              Log In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
