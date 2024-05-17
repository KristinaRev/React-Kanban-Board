import React, {useContext, useState} from 'react';
import Button from '../../ui/button/Button';
import {StoreContext} from "../../stores/root.store";
import {observer} from "mobx-react-lite";
import css from './Forms.module.css';
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import {LIST_COPY, LIST_TYPES} from "../../config";

const FormAddNewTask = () => {
	const {tasksStore} = useContext(StoreContext);

	const handleChange = e => tasksStore.changeFormValue(e);
	const formSubmit = async (e) => {
		e.preventDefault();
		if (tasksStore.taskForm.title) {
			await tasksStore.addTask(tasksStore.taskForm.title, tasksStore.taskForm.description, tasksStore.taskForm.priority);
			tasksStore.changeFormVisible(false);
		} else {
			//todo
			//вывести, что заголовок обязателен
		}
	};

	const taskStatuses = Object.values(tasksStore.taskStatuses).map(list => ({
		value: list,
		label: list,
	}));

	return (
		<form onSubmit={formSubmit} className={css.form}>
			<Input
				id='taskTitle'
				name='title'
				type='text'
				placeholder='Введите название задачи'
				onChange={handleChange}
				value={tasksStore.taskForm.title}
			/>
			<Select
				id='taskPriority'
				options={taskStatuses}
				onChange={handleChange}
				name='priority'
			/>
			<Input
				type='textarea'
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
