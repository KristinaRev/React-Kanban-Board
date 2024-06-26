import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Board from '../../pages/board/Board';
import TaskDetail from '../../pages/task-detail/TaskDetail';
import PortalPage from '../../pages/PortalPage';
import { ROUTES } from '../../routes';
import Profile from '../../pages/profile/Profile';
import Auth from '../../pages/auth/Auth';
import Reg from '../../pages/reg/Reg';
import Admin from '../../pages/admin/Admin';
import css from './Main.module.css';

const Main: FC = (props) => {
  return (
    <main className={css.main}>
      <Routes>
        <Route path={'/'} element={<Board {...props} />} />
        <Route path={'/tasks/:taskId'} element={<TaskDetail />} />
        <Route path={ROUTES.PORTAL} element={<PortalPage />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.AUTHORIZATION} element={<Auth />} />
        <Route path={ROUTES.REGISTRATION} element={<Reg />} />
        <Route path={ROUTES.ADMIN} element={<Admin />} />
      </Routes>
    </main>
  );
};

export default Main;
