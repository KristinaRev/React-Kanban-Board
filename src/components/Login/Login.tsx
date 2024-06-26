import React, { useContext, useState } from 'react';
import Button from '../../ui/button/Button';
import UserAvatar from '../../assets/user-menu.png';
import { Link } from 'react-router-dom';
import { useDelayUnmount } from '../../hooks/useDelayUnmount';
import './Login.scss';
import { StoreContext } from '../../stores/root.store';
import { ROUTES } from '../../routes';

const mountedcss = { animation: 'inAnimation 250ms ease-in' };
const unmountedcss = {
  animation: 'outAnimation 270ms ease-out',
  animationFillMode: 'forwards'
};

interface LoginProps {
  onLogout: () => void;
}

export default function Login({ onLogout }: LoginProps) {
  const { usersStore } = useContext(StoreContext);
  const [isMounted, setIsMounted] = useState(false);
  const showDiv = useDelayUnmount(isMounted, 250);
  const iconClass: string = isMounted ? 'icon isopen' : 'icon';

  const toggleIsMounted = () => setIsMounted((prevIsMounted) => !prevIsMounted);

  return (
    <div className="login_wrapper" onClick={toggleIsMounted}>
      <img src={UserAvatar} alt="user avatar" className="user_avatar" />
      <div className={iconClass} />
      {showDiv && (
        <div className="login_dropdown" style={isMounted ? mountedcss : unmountedcss}>
          <Link to={`/profile`} className="login_dropdown_button">
            Profile
          </Link>
          {usersStore.login ? (
            <Button className="login_dropdown_button" onClick={onLogout}>
              Log Out
            </Button>
          ) : (
            <Link to={ROUTES.AUTHORIZATION} className="login_dropdown_button">
              Log In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
