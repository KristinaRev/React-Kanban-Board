import React from "react";
import css from './Task.module.css'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';

const Task = ({ id, index, title, status, moveTask }) => {
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

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity }}>
            {title}
        </div>
    );
};

export default Task;

