import {makeAutoObservable} from "mobx";
import uniqid from "uniqid";

export class TasksStore {
    constructor() {
        makeAutoObservable(this)
    }
    tasks = [];

    taskDetail = {
        title: '',
        description: ''
    }

    taskForm = {
        isVisible: false,
        title: '',
        description: ''
    }

    getTasks = async () => {
        try {
            const response = await fetch(`http://localhost:3001/tasks`);
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
            this.tasks = await response.json();
        } catch (error) {
            console.error('Ошибка при получении задач:', error.message);
        }
    }

    addTask = async (title, description) => {
        const newTask = {
            id: uniqid(),
            title,
            description,
            created: new Date().toISOString(),
            status: 'backlog',
        };

        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
        }).catch((error) => {
            console.error('Error adding task:', error.message);
        });

        this.tasks = [...this.tasks, newTask];
        this.taskForm = {
            title: '',
            description: ''
        };
    }

    changeFormValue = (e) => {
        this.taskForm = ({...this.taskForm, [e.target.name]: e.target.value})
    }

    deleteTask = async (taskId) => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);

        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }
                console.log(`Задача ${taskId} успешно удалена на сервере`);
            })
            .catch(error => console.error('Ошибка удаления задачи на сервере:', error.message))
    }

    replaceListTasks = (dragIndex, hoverIndex) => {
        const updatedTasks = [...this.tasks];
        const [draggedTask] = updatedTasks.splice(dragIndex, 1);
        updatedTasks.splice(hoverIndex, 0, draggedTask);
        this.tasks = updatedTasks;
    }

    changeFormVisible = (isVisible) => {
        this.taskForm.isVisible = isVisible;
    }

    changeTaskStatus = async (taskId, newStatus) => {
        // this.tasks = this.tasks.map(task => task.id === taskId ? {...task, status: newStatus} : task);
        // const taskToUpdate = this.tasks.find(task => task.id === taskId);

        // const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        // const task = this.tasks[taskIndex];
        // this.tasks[taskIndex] = {...task, status: newStatus}

        const taskToUpdate = this.tasks.find(task => task.id === taskId);
        taskToUpdate.status = newStatus
        this.tasks = [...this.tasks]
        if (taskToUpdate) {
            fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка: ${response.statusText}`);
                    }
                })
                .catch(error => console.error('Описание задачи не обновлено:', error.message));
        }
    }
}
