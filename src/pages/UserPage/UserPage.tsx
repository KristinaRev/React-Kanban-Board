import { FC, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import css from './UserPage.module.css';
import UserInfo from '../../components/UserInfo/UserInfo';
import { StoreContext } from '../../stores/root.store';
import AuthRequirement from '../../components/AutthRequirement/AuthRequirement';

const UserPage: FC = () => {
  const { usersStore } = useContext(StoreContext);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.wrapper}>
        <h1>User Page</h1>

        {usersStore.login ? (
          <>
            <UserInfo />
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

export default observer(UserPage);
