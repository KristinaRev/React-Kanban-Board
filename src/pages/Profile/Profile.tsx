import React, { useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserInfo from '../../components/ProfileInfo/ProfileInfo';
import css from './Profile.module.css';
import UserMainPanel from '../../components/UserMainPanel/UserMainPanel';
import { StoreContext } from '../../stores/root.store';
import AuthRequirement from '../../components/AutthRequirement/AuthRequirement';

const Profile: React.FC = () => {
  const { usersStore } = useContext(StoreContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.profile}>
        <h1>Profile</h1>
        {usersStore.login ? (
          <>
            <div className={css.board}>
              <UserInfo />
              <UserMainPanel />
            </div>
            <Link to="/" className={css.link}>
              Назад к задачам
            </Link>
          </>
        ) : (
          <AuthRequirement />
        )}
      </div>
    </DndProvider>
  );
};

export default observer(Profile);
