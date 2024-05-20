import React, {useState, useEffect, useMemo, useCallback, useContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { countTask } from "./utils";
import './App.css';
import {observer} from "mobx-react-lite";
import {StoreContext} from "./stores/root.store";

function App() {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);
    const [tasks, setTasks] = useState([]);

    const {tasksStore} = useContext(StoreContext)

    useEffect(() => {
        if(user) {
            tasksStore.getTasks()
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

    const resultCountTask = useMemo(() => countTask(tasksStore.tasks), [tasksStore.tasks]);

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

export default observer(App);

//todo сохранить в локал сторедж актив
