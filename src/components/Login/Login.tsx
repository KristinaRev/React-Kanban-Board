import { useEffect, useState } from 'react';
import Button from "../../ui/button/Button";
import UserAvatar from '../../assets/user-menu.png';
import { Link } from "react-router-dom";
import './Login.scss';

function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
    const [showDiv, setShowDiv] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
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

interface LoginProps {
    user: any;
    onLogin: () => void;
    onLogout: () => void;
}

export default function Login({ user, onLogin, onLogout }: LoginProps) {
    const [isMounted, setIsMounted] = useState(false);
    const showDiv = useDelayUnmount(isMounted, 250);

    const toggleIsMounted = () => setIsMounted(prevIsMounted => !prevIsMounted);

    return (
        <div className="login_wrapper" onClick={toggleIsMounted}>
            <img src={UserAvatar} alt="user avatar" className="user_avatar"/>
            <div className={`$""icon} ${isMounted ? "isopen" : ''}`} />
            {showDiv && (
                <div
                    className="login_dropdown"
                    style={isMounted ? mountedcss : unmountedcss}
                >
                    <Link to={`/profile`} className="login_dropdown_button">Profile</Link>
                    <Button className="login_dropdown_button" onClick={user ? onLogout : onLogin}>
                        {user ? "Log Out" : "Log In"}
                    </Button>
                </div>
            )}
        </div>
    );
}
