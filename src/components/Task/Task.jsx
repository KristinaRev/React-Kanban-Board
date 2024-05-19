import React, {useContext, useMemo} from "react";
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from "../../ui/button/Button";
import FormattedTitle from "../../ui/formatted-title/FormattedTitle";
import css from './Task.module.css';
import {StoreContext} from "../../stores/root.store";
import Tag from "../../ui/tag/Tag";

const Task = ({ id, index, title, status, moveTask, priority}) => {

    const {tasksStore} = useContext(StoreContext);

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id, index, status },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        hover: item => {
            if (item.id !== id && item.status === status) {
                if (item.index !== index) {
                    moveTask(item.index, index);
                    item.index = index;
                }
            }
        },
    });

    const opacity = isDragging ? 0.5 : 1;

    const handleDelete = async () => {
        await tasksStore.deleteTask(id);
    };

    return (
        <div ref={node => drag(drop(node))} style={{ opacity }} className={css.task}>
            <div className={css.task_top}>
                <FormattedTitle title={title} className={css.title}/>
                <Link to={`/tasks/${id}`} className={css.taskDetailsButton}>
                    Detail
                </Link>
                <Button type="button" onClick={handleDelete} >
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

