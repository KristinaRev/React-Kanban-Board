import React, { useEffect, useMemo, useCallback, useContext, FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { countTask } from '../../utils/helpers/utils';
import { StoreContext } from '../../stores/root.store';
import css from './MainLayout.module.css';
import { ROUTES } from '../../constants';

const MainLayout: FC = observer(() => {
  const { tasksStore, usersStore } = useContext(StoreContext);
  const navigate = useNavigate();

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
    navigate(ROUTES.root);
  }, []);

  const resultCountTask = useMemo(() => countTask(tasksStore.tasks), [tasksStore.tasks]);

  return (
    <div className={css.main}>
      <Header onLogout={handleLogout} />
      <Outlet />
      <Footer
        backlogCount={resultCountTask.backlog}
        doneCount={resultCountTask.done}
        inProgressCount={resultCountTask.inProgress}
        readyCount={resultCountTask.ready}
      />
    </div>
  );
});

export default MainLayout;
