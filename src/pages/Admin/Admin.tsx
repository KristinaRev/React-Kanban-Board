import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ListUsers from '../../components/List-users/ListUsers';
import { StoreContext } from '../../stores/root.store';
import AuthRequirement from '../../components/AutthRequirement/AuthRequirement';
import css from './Admin.module.css';

const Admin: FC = () => {
  const { usersStore } = useContext(StoreContext);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.Admin}>{usersStore.login ? <ListUsers /> : <AuthRequirement />}</div>
    </DndProvider>
  );
};

export default observer(Admin);
