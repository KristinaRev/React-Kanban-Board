import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import uniqid from "uniqid";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        loading: false,
        tasks: [],
        form: {
            title: '',
            description: '',
        }
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        setForm: (state, action) => {
            state.form = {...state.form, ...action.payload}
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createTaskServer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createTaskServer.fulfilled, (state, action) => {
                state.tasks = [...state.tasks, action.payload];
                state.form = {
                    title: '',
                    description: '',
                };
                state.loading = false;
            })
            .addCase(createTaskServer.rejected, (state, action) => {
                console.log('Задача не добавлена');
                state.loading = false;
            })
            .addCase(deleteTaskServer.pending, (state, action) => {
                state.loading = true;
                console.log(state)
                console.log(action)
            })
            .addCase(deleteTaskServer.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.meta.arg)
                state.loading = false;
            })
            .addCase(deleteTaskServer.rejected, (state, action) => {
                console.log('Задача не удалена');
                state.loading = false;
            })
});

export const {setTasks, setForm} = tasksSlice.actions;
export default tasksSlice.reducer;

export const createTaskServer = createAsyncThunk(
    'tasks/createTask',
    async (newTask) =>
        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...newTask,
                id: uniqid(),
                created: new Date().toISOString(),
                status: 'backlog',
            }),
        }).then(r => r.json()))

export const deleteTaskServer = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId) =>
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'DELETE',
        }).then(r => r.json()))
