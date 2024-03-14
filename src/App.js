import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { BrowserRouter } from 'react-router-dom';
import {countTask} from "./utils";
import './App.css';

function App() {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/tasks`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log('Tasks data fetched:', data);
                    setTasks(data);
                })
                .catch(error => console.error('Error fetching tasks:', error.message));
        }
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

    const resultCountTask = useMemo(() => {
        return countTask(tasks);
    }, [tasks]);

    return (
        <BrowserRouter>
            <div>
                <Header user={user} onLogin={handleLogin} onLogout={handleLogout}  />
                <Main user={user} tasks={tasks} setTasks={setTasks} />
                <Footer backlogCount={resultCountTask.backlog}
                        doneCount={resultCountTask.done}
                        inProgressCount={resultCountTask.inProgress}
                        readyCount={resultCountTask.ready}
                />
            </div>
        </BrowserRouter>
    );
}

export default App;
