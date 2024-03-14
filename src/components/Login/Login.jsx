import React, { useEffect, useState } from 'react';
import UserAvatar from '../../assets/user-menu.png';
import css from './Login.module.css';

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

    const toggleIsMounted = () => setIsMounted(prevIsMounted => !prevIsMounted);

    return (
        <div className={css.login_wrapper} onClick={toggleIsMounted}>
            <img src={UserAvatar} alt="user avatar" className={css.user_avatar} />
            <div className={`${css.icon} ${isMounted ? css.isopen : ''}`} />
            {showDiv && (
                <div
                    className={css.login_dropdown}
                    style={isMounted ? mountedcss : unmountedcss}
                >
                    <button className={css.login_dropdown_button}>Profile</button>
                    <button className={css.login_dropdown_button}>Log In</button>
                </div>
            )}
        </div>
    );
}
