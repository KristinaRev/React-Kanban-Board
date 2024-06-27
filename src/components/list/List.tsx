import { FC, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import { useDrop } from 'react-dnd';
import { LIST_TYPES } from '../../constants/config';
import { ItemTypes } from '../../constants/ItemTypes';
import FormAddNewTask from '../forms/FormAddNewTask';
import Task from '../Task/Task';
import { StoreContext } from '../../stores/root.store';
import { observer } from 'mobx-react-lite';
import css from './List.module.css';

interface AnimationConfig {
  opacity: number;
}

interface TaskType {
  id: string;
  title: string;
  status: string;
  priority: string;
}

interface ListProps {
  type: string;
  title: string;
  tasks: TaskType[];
}

export interface MoveTaskInsideList {
  (dragIndex: number, hoverIndex: number): void;
}

export interface MoveTask {
  (taskId: string, newStatus: string): Promise<void>;
}

const List: FC<ListProps> = (props) => {
  const { type, title, tasks } = props;
  const { tasksStore, usersStore } = useContext(StoreContext);

  const handleAddNewClick = () => {
    tasksStore.changeFormVisible(!tasksStore.taskForm.isVisible);
  };

  const moveTask: MoveTask = async (taskId, newStatus) => {
    await tasksStore.changeTaskStatus(taskId, newStatus);
  };

  const moveTaskInsideList: MoveTaskInsideList = (dragIndex, hoverIndex) => {
    tasksStore.replaceListTasks(dragIndex, hoverIndex);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: string }) => moveTask(item.id, type)
  });

  const transitions = useTransition<boolean, AnimationConfig>(
    tasksStore.taskForm.isVisible ?? false,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: { duration: 500 },
      onDestroyed: (isVisible: boolean) => {
        if (!isVisible) {
          tasksStore.changeFormVisible(true);
        }
      }
    }
  );

  return (
    <div ref={drop} className={css.list}>
      <h2 className={css.listTitle}>{title}</h2>
      {tasks.length ? (
        tasks.map((task, index) => (
          <Task
            key={task.id}
            index={index}
            id={task.id}
            title={task.title}
            status={task.status}
            priority={task.priority}
            moveTaskInsideList={moveTaskInsideList}
          />
        ))
      ) : (
        <p>No tasks added yet</p>
      )}
      {type === LIST_TYPES.BACKLOG && usersStore.login && (
        <button onClick={handleAddNewClick} className={css.addButton}>
          + Add new task
        </button>
      )}
      {transitions(
        (style, item) =>
          item &&
          usersStore.login &&
          type === LIST_TYPES.BACKLOG && (
            <animated.div style={style}>
              <FormAddNewTask />
            </animated.div>
          )
      )}
    </div>
  );
};

export default observer(List);
