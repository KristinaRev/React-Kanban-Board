import { FC, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../ui/button/Button';
import FormattedTitle from '../../ui/formatted-title/FormattedTitle';
import css from './Task.module.css';
import { StoreContext } from '../../stores/root.store';
import Tag from '../../ui/tag/Tag';
import { MoveTaskInsideList } from '../List/List';

interface TaskProps {
  id: string;
  index: number;
  title: string;
  status: string;
  moveTaskInsideList: MoveTaskInsideList;
  priority?: string;
}

const Task: FC<TaskProps> = ({ id, index, title, status, moveTaskInsideList, priority }) => {
  const { tasksStore } = useContext(StoreContext);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id, index, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop<{ id: string; index: number; status: string }>({
    accept: ItemTypes.TASK,
    hover: (item) => {
      if (item.id !== id && item.status === status) {
        if (item.index !== index) {
          moveTaskInsideList(item.index, index);
          item.index = index;
        }
      }
    }
  });

  const opacity = isDragging ? 0.5 : 1;

  const handleDelete = async () => {
    await tasksStore.deleteTask(id);
  };

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }} className={css.task}>
      <div className={css.task_top}>
        <FormattedTitle title={title} className={css.title} />
        <Link to={`/tasks/${id}`} className={css.taskDetailsButton}>
          Detail
        </Link>
        <Button type="button" onClick={handleDelete}>
          <FaTimes />
        </Button>
      </div>
      <div className={css.task_bottom}>
        <Tag>{priority}</Tag>
      </div>
    </div>
  );
};

export default Task;
