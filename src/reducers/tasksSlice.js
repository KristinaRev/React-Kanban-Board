import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import uniqid from "uniqid";

// const todosAdapter = createEntityAdapter();
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        loading: false,
        tasks: [],
        form: {
            title: '',
            description: '',
        },
        taskDetail: {
            title: '',
            description: ''
        }
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        clearTasks: (state, action) => {
            state.tasks = []
        },
        setForm: (state, action) => {
            state.form = {...state.form, ...action.payload}
        },
        setTaskDetailDescription: (state, action) => {
            state.taskDetail.description = action.payload;
        },
        clearTaskDetail: (state, action) => {
            state.taskDetail = {
                title: '',
                description: ''
            };
        }
    },
    extraReducers: builder =>
        builder
            .addCase(setTasksServer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(setTasksServer.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(setTasksServer.rejected, (state, action) => {
                console.log('Задачи не найдены')
                state.loading = false;
            })
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
            })
            .addCase(deleteTaskServer.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.meta.arg)
                state.loading = false;
            })
            .addCase(deleteTaskServer.rejected, (state, action) => {
                console.log('Задача не удалена');
                state.loading = false;
            })
            .addCase(setNewStatusTaskServer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(setNewStatusTaskServer.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(task => task.id === action.meta.arg.taskId ? { ...task, status: action.meta.arg.type } : task);
                state.loading = false;
            })
            .addCase(setNewStatusTaskServer.rejected, (state, action) => {
                console.log('Статус задачи не обновлен');
                state.loading = false;
            })
            .addCase(setNewDescriptionTaskServer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(setNewDescriptionTaskServer.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(task => task.id === action.meta.arg.taskId ? { ...task, description: action.meta.arg.localDescription } : task);
                state.loading = false;
            })
            .addCase(setNewDescriptionTaskServer.rejected, (state, action) => {
                console.log('Описание задачи не обновлено');
                state.loading = false;
            })
            .addCase(setTaskDetailServer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(setTaskDetailServer.fulfilled, (state, action) => {
                const {title, description} = action.payload;
                state.taskDetail = {title, description}
                console.log(action)
                state.loading = false;
            })
            .addCase(setTaskDetailServer.rejected, (state, action) => {
                console.log('Не возможно получить задачу');
                state.loading = false;
            })
});

export const { setTasks, clearTaskDetail, setTaskDetailDescription, setForm, clearTasks} = tasksSlice.actions;
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

export const setTasksServer = createAsyncThunk (
    'tasks/setTasks',
    async (taskId) =>
        fetch(`http://localhost:3001/tasks`, {
            method: 'GET',
        }).then(r => r.json())
)

export const setNewStatusTaskServer = createAsyncThunk (
    'tasks/setNewStatusTask',
    async ({taskId, type}) =>
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: type }),
        }))

export const setNewDescriptionTaskServer = createAsyncThunk (
    'tasks/setNewDescriptionTask',
    async ({taskId, localDescription}) =>
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: localDescription }),
        }).then(r => r.json()))

export const setTaskDetailServer = createAsyncThunk (
    'tasks/setTaskDetail',
    async (taskId, localDescription) =>
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'GET',
        }).then(r => r.json())
)
