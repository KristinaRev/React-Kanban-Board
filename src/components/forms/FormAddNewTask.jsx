import React, { useState } from 'react';
import Button from '../button/Button';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import css from './Forms.module.css';

const FormAddNewTask = ({ userId, tasks, setTasks, formSubmitLocal }) => {
	const [values, setValues] = useState({
		title: '',
		description: ''
	});

	const formSubmit = useFormSubmit({ tasks, setTasks }, (updatedTasks) => {
		formSubmitLocal();
		console.log('Added new task:', updatedTasks);
	});

	const handleChange = e =>
		setValues((prevState) =>
            ({...prevState, [e.target.name]: e.target.value}))

	const handleSubmit = e => {
		e.preventDefault();
		if (values.title) {
			formSubmit(values.title, values.description, userId);
			setValues({ title: '', description: '' });
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
				value={values.title}
			/>
			<textarea
				className={css.input}
				id='taskDescription'
				name='description'
				placeholder='Enter task description'
				value={values.description}
				onChange={handleChange}
			/>
			<Button type='submit'>Add</Button>
		</form>
	);
};

export default FormAddNewTask;
