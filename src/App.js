import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { countTask } from "./utils";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import {clearTasks, setTasksServer} from "./reducers/tasksSlice";


function App() {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => {
        return state.tasks.tasks;
    });

    useEffect(() => {
        if (user) {
            dispatch(setTasksServer())
        }
    }, [user]);

    const handleLogin = useCallback(() => {
        const USER_NAME_TO_LOGIN = 'SPIKS';
        setUser(USER_NAME_TO_LOGIN);
    }, []);

    const handleLogout = useCallback(() => {
        window.localStorage.removeItem('user');
        setUser(null);
        dispatch(clearTasks())
    }, []);

    const resultCountTask = useMemo(() => countTask(tasks), [tasks]);

    return (
        <BrowserRouter>
            <div>
                <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
                <Main user={user} tasks={tasks} setTasks={setTasksServer} />
                <Footer
                    backlogCount={resultCountTask.backlog}
                    doneCount={resultCountTask.done}
                    inProgressCount={resultCountTask.inProgress}
                    readyCount={resultCountTask.ready}
                />
            </div>
        </BrowserRouter>
    );
}

export default App;
