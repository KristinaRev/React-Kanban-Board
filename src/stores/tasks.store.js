import {makeAutoObservable} from "mobx";

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


}
