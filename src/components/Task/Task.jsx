import React, { useMemo } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from "../button/Button";
import FormattedTitle from "../formatted-title/FormattedTitle";
import css from './Task.module.css';

const Task = ({ id, index, title, status, moveTask, onDelete }) => {
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

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div ref={node => drag(drop(node))} style={{ opacity }} className={css.task}>
            <FormattedTitle title={title} />
            <Link to={`/tasks/${id}`} className={css.taskDetailsButton}>
                Detail
            </Link>
            <Button type="button" onClick={handleDelete} >
                <FaTimes />
            </Button>
        </div>
    );
};

export default Task;

