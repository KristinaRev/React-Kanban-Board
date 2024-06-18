import {useState, useEffect, useMemo, useCallback, useContext, FC, useLayoutEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { countTask } from "./utils";
import { observer } from "mobx-react-lite";
import { StoreContext } from "./stores/root.store";
import './App.css';

interface User {
    name: string;
}

const App: FC = observer(() => {
    const storedUserJSON = window.localStorage.getItem('user');
    const storedUser: User | null = storedUserJSON ? JSON.parse(storedUserJSON) : null;
    const [user, setUser] = useState<User | null>(storedUser);

    const { tasksStore, usersStore } = useContext(StoreContext);

    useEffect(() => {
        if (usersStore.login) {
            tasksStore.getTasks();
        }
    }, [tasksStore]);

    useEffect(() => {
        usersStore.getUsers();
    }, [usersStore]);


    const handleLogout = useCallback(() => {
        usersStore.logOut();
        tasksStore.removeTasks();
    }, []);

    const resultCountTask = useMemo(() => countTask(tasksStore.tasks), [tasksStore.tasks]);

    return (
        <BrowserRouter>
            <div>
                <Header onLogout={handleLogout} />
                <Main/>
                <Footer
                    backlogCount={resultCountTask.backlog}
                    doneCount={resultCountTask.done}
                    inProgressCount={resultCountTask.inProgress}
                    readyCount={resultCountTask.ready}
                />
            </div>
        </BrowserRouter>
    );
});

export default App;
