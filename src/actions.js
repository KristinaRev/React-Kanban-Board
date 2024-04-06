export const UPDATE_TASKS = 'UPDATE_TASKS';

export const updateTasks = (tasks) => ({
    type: UPDATE_TASKS,
    payload: tasks,
});
