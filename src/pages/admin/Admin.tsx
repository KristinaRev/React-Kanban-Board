import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import css from './Admin.module.css';
import ListUsers from '../../components/list-users/ListUsers';

const Admin: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.Admin}>
        <ListUsers />
      </div>
    </DndProvider>
  );
};

export default observer(Admin);
