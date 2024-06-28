import React, { useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LIST_TYPES, LIST_COPY } from '../../constants/config';
import List from '../../components/List/List';
import { StoreContext } from '../../stores/root.store';
import { observer } from 'mobx-react-lite';
import css from './Board.module.css';

interface Task {
  id: string;
  title: string;
  status: string;
  priority?: string;
}

const Board: React.FC = observer(() => {
  const { tasksStore } = useContext(StoreContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.board}>
        {Object.values(LIST_TYPES).map((type) => (
          <List
            key={LIST_COPY[type]}
            type={type}
            title={LIST_COPY[type]}
            tasks={tasksStore.tasks.filter((task: Task) => task.status === type)}
          />
        ))}
      </div>
    </DndProvider>
  );
});

export default Board;
