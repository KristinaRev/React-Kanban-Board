import React from "react";
import css from './Task.module.css'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import { FaTimes } from 'react-icons/fa';

const Task = ({ id, index, title, status, moveTask, onDelete}) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id, index, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        hover: (item) => {
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

    const handleTaskClick = () => {
        // Здесь можно добавить логику для открытия деталей задачи
        console.log(`Clicked on task ${id}`);
    };

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity }} className={css.task}>
            <span>{title}</span>
            <button onClick={handleTaskClick} className={css.taskDetailsButton}>Details</button>
            <button type="button" onClick={handleDelete} className={css.deleteButton}><FaTimes /></button> {/* Кнопка для удаления задачи */}
        </div>
    );
};

export default Task;

