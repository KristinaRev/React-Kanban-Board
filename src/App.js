import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { countTask } from "./utils";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import {setTasks} from "./reducers/tasksSlice";


function App() {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);
    //const [tasks, setTasks] = useState([]);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => {
        return state.tasks.tasks;
    });
    console.log(tasks)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const response = await fetch(`http://localhost:3001/tasks`);
                    if (!response.ok) {
                        throw new Error(`Ошибка: ${response.statusText}`);
                    }
                    const data = await response.json();
                    dispatch(setTasks(data));
                }
            } catch (error) {
                console.error('Ошибка при получении задач:', error.message);
            }
        };

        fetchData();
    }, [user]);

    const handleLogin = useCallback(() => {
        const USER_NAME_TO_LOGIN = 'SPIKS';
        setUser(USER_NAME_TO_LOGIN);
    }, []);

    const handleLogout = useCallback(() => {
        window.localStorage.removeItem('user');
        setUser(null);
        setTasks([]);
    }, []);

    const resultCountTask = useMemo(() => countTask(tasks), [tasks]);

    return (
        <BrowserRouter>
            <div>
                <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
                <Main user={user} tasks={tasks} setTasks={setTasks} />
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
