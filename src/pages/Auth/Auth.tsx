import React, { useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserLogin from '../../components/User-login/UserLogin';
import { useNavigate } from 'react-router-dom';
import css from './Auth.module.css';
import { StoreContext } from '../../stores/root.store';

const Auth: React.FC = () => {
  const { tasksStore, usersStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/');
    if (usersStore.login) {
      tasksStore.getTasks();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.Auth}>
        <h1>Войдите в учетную запись</h1>
        <UserLogin className={css.form} onLogin={handleLogin} />
      </div>
    </DndProvider>
  );
};

export default Auth;
