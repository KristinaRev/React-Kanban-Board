import {createSlice} from "@reduxjs/toolkit";
import uniqid from "uniqid";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {tasks: []},
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        deleteTasks: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        createTasks: (state, action) => {
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
})

export const {setTasks, deleteTasks, createTasks} = tasksSlice.actions;

export default tasksSlice.reducer;

