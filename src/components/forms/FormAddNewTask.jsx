import React, {useContext, useState} from 'react';
import Button from '../button/Button';
import {StoreContext} from "../../stores/root.store";
import {observer} from "mobx-react-lite";
import css from './Forms.module.css';

const FormAddNewTask = () => {
	const {tasksStore} = useContext(StoreContext);

	const handleChange = e => tasksStore.changeFormValue(e);
	const formSubmit =  async (e) => {
		e.preventDefault();
		if(tasksStore.taskForm.title) {
			await tasksStore.addTask(tasksStore.taskForm.title, tasksStore.taskForm.description);
			tasksStore.changeFormVisible(false);
		} else {
			//todo
			//вывести, что заголовок обязателен
		}
	};

	return (
		<form onSubmit={formSubmit} className={css.form}>
			<input
				className={css.input}
				id='taskTitle'
				name='title'
				type='text'
				placeholder='Введите название задачи'
				onChange={handleChange}
				value={tasksStore.taskForm.title}
			/>
			<textarea
				className={css.input}
				id='taskDescription'
				name='description'
				placeholder='Введите описание задачи'
				value={tasksStore.taskForm.description}
				onChange={handleChange}
			/>
			<Button type='submit'>Add</Button>
		</form>
	);
};

export default observer(FormAddNewTask);
