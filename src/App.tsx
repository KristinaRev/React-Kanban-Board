import {useState, useEffect, useMemo, useCallback, useContext, FC} from 'react';
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

    const { tasksStore } = useContext(StoreContext);

    useEffect(() => {
        if (user) {
            tasksStore.getTasks();
        }
    }, [user, tasksStore]);

    const handleLogin = useCallback(() => {
        const USER_NAME_TO_LOGIN: string = 'SPIKS';
        setUser({ name: USER_NAME_TO_LOGIN });
        window.localStorage.setItem('user', JSON.stringify({ name: USER_NAME_TO_LOGIN }));
    }, []);

    const handleLogout = useCallback(() => {
        window.localStorage.removeItem('user');
        setUser(null);
        tasksStore.removeTasks();
    }, []);

    const resultCountTask = useMemo(() => countTask(tasksStore.tasks), [tasksStore.tasks]);

    return (
        <BrowserRouter>
            <div>
                <Header user={user?.name || null} onLogin={handleLogin} onLogout={handleLogout} />
                <Main user={user?.name || null} />
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
