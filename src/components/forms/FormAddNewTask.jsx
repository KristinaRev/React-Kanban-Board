import {useState} from 'react'
import React from 'react'
import css from './Forms.module.css'
import Button from "../button/Button";

const FormAddNewTask = props => {
	const {formSubmit} = props
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
