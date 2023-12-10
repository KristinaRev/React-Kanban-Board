import css from './Login.module.css'
import UserAvatar from '../../assets/user-menu.png';
import { useEffect, useState } from 'react';


function useDelayUnmount(isMounted, delayTime) {

    const [showDiv, setShowDiv] = useState(false);

    useEffect(() => {
      let timeoutId;
      if (isMounted && !showDiv) {
        setShowDiv(true);
      } else if (!isMounted && showDiv) {
        timeoutId = setTimeout(() => setShowDiv(false), delayTime);
      }
      return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, showDiv]);

    return showDiv;
}

const mountedcss = { animation: "inAnimation 250ms ease-in" };

const unmountedcss = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards"
};

export default function Login() {
    const [isMounted, setIsMounted] = useState(false);
    const showDiv = useDelayUnmount(isMounted, 250);

    return (
        <div className={css.login_wrapper} onClick={() => setIsMounted(!isMounted)}>
            <img src={UserAvatar} alt="user avatar" className={css.user_avatar} />
            <div className={isMounted ? css.icon + ' ' + css.isopen : css.icon} />
            {showDiv &&
                <div
                    className={css.login_dropdown}
                    css={isMounted ? mountedcss : unmountedcss}
                >
                    <button className={css.login_dropdown_button}>Profile</button>
                    <button className={css.login_dropdown_button}>Log Out</button>
                </div>

            }
        </div>
    );
}
