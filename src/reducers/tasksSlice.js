import { createSlice } from "@reduxjs/toolkit";
import uniqid from "uniqid";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { tasks: [] },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        createTask: (state, action) => {
            const newTask = {
                id: uniqid(),
                title: action.payload.title,
                description: action.payload.description,
                created: new Date().toISOString(),
                status: 'backlog',
            };
            state.tasks = [...state.tasks, newTask];
        }
    }
});

export const { setTasks, deleteTask, createTask } = tasksSlice.actions;
export default tasksSlice.reducer;
export const createTaskAsync = (newTask) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            dispatch(createTask(data));
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };
};

