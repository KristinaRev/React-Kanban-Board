import React, {useState} from 'react';
import Button from '../button/Button';
import {useDispatch, useSelector} from "react-redux";
import {createTaskServer, setForm} from "../../reducers/tasksSlice";
import css from './Forms.module.css';


const FormAddNewTask = ({userId, tasks, setTasks, formSubmitLocal}) => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.tasks.form);

    const handleChange = e =>
        dispatch(setForm({[e.target.name]: e.target.value}))

    const handleSubmit = async e => {
        e.preventDefault();
        if (form.title) {
            dispatch(createTaskServer(form));
        }
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <input
                className={css.input}
                id='taskTitle'
                name='title'
                type='text'
                placeholder='Enter task title'
                onChange={handleChange}
                value={form.title}
            />
            <textarea
                className={css.input}
                id='taskDescription'
                name='description'
                placeholder='Enter task description'
                value={form.description}
                onChange={handleChange}
            />
            <Button type='submit'>Add</Button>
        </form>
    );
};

export default FormAddNewTask;
