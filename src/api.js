const API_BASE_URL = 'http://localhost:3001';

export const fetchTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }
    return await response.json();
};

export const updateTaskStatus = async (taskId, newStatus) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
    });
    if (!response.ok) {
        throw new Error(`Ошибка при обновлении статуса задачи: ${response.statusText}`);
    }
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Ошибка при удалении задачи: ${response.statusText}`);
    }
};
