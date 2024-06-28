import { useEffect, useMemo, useCallback, useContext, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import { countTask } from './utils/helpers/utils';
import { observer } from 'mobx-react-lite';
import { StoreContext } from './stores/root.store';
import './App.css';

const App: FC = observer(() => {
  // const storedUserJSON = window.localStorage.getItem('user');
  // todo: const storedUser: User | null = storedUserJSON ? JSON.parse(storedUserJSON) : null;

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
        <Main />
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
