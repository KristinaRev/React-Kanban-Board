import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Board from '../Board/Board';
import TaskDetail from '../Task-detail/TaskDetail';
import PortalPage from '../PortalPage';
import Profile from '../Profile/Profile';
import Auth from '../Auth/Auth';
import Reg from '../Reg/Reg';
import Admin from '../Admin/Admin';
import { ROUTES } from '../../constants';
import MainLayout from '../../components/MainLayout/MainLayout';
import UserPage from '../UserPage/UserPage';

const RoutingPage: FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.root} element={<Board />} />
        <Route path={ROUTES.task} element={<TaskDetail />} />
        <Route path={ROUTES.userPage} element={<UserPage />} />
        <Route path={ROUTES.PORTAL} element={<PortalPage />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.AUTHORIZATION} element={<Auth />} />
        <Route path={ROUTES.REGISTRATION} element={<Reg />} />
        <Route path={ROUTES.ADMIN} element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default RoutingPage;
