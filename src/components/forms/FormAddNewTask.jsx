import {useState} from 'react'
import React from 'react'
import css from './Forms.module.css'
import Button from "../button/Button";
import {useFormSubmit} from "../../hooks/useFormSubmit";

const FormAddNewTask = props => {

	const { title, description, userId } = props

	const formSubmit = useFormSubmit({title, description, userId}, (data) => {
		console.log(data);
	});


	const [values, setValues] = useState({
		title: '',
		description: ''
	})

	const handleChange = e => {
		const fieldName = e.target.name
		setValues({...values, [fieldName]: e.target.value})
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (values.title) {
			formSubmit(values.title, values.description)
		}
	}
	return (
		<form onSubmit={handleSubmit} className={css.form}>
			<input className={css.input} id='taskTitle' name='title' type='text' placeholder='Enter task title' onChange={handleChange} value={values.title} />
			<textarea className={css.input} id='taskDescription' name='description' placeholder='Enter task description' value={values.description} onChange={handleChange} />
			<Button type='submit'>
				Add
			</Button>
		</form>
	)
}

export default FormAddNewTask
