import { makeAutoObservable } from 'mobx';
import uniqid from 'uniqid';
import { ChangeEvent } from 'react';
import { showErrorNotification } from '../utils/helpers/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  created: string;
  status: string;
  creator: string | null;
  expectedTime: string;
}

interface TaskForm {
  isVisible?: boolean;
  title: string;
  description: string;
  priority: string;
  expectedTime: string;
  creator: string | null;
}

export class TasksStore {
  constructor() {
    makeAutoObservable(this);
  }
  tasks: Task[] = [];

  taskPriorities = ['low', 'medium', 'high', 'blocker'];

  taskDetail = {
    isDeleted: false,
    title: '',
    description: '',
    status: '',
    priority: '',
    expectedTime: ''
  };

  taskForm: TaskForm = {
    isVisible: false,
    title: '',
    description: '',
    priority: '',
    expectedTime: '',
    creator: ''
  };

  getTasks = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/tasks`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      this.tasks = await response.json();
    } catch (error) {
      showErrorNotification('Ошибка при получении задач', error);
    }
  };

  getTask = async (taskId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      this.taskDetail = await response.json();
    } catch (error) {
      showErrorNotification('Невозможно получить задачу', error);
    }
  };

  updateTaskDescription = async (taskId: string, localDescription: string): Promise<void> => {
    try {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          task.description = localDescription;
        }
        return task;
      });

      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: localDescription })
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    } catch (error) {
      showErrorNotification('Ошибка обновления описания задачи на сервере', error);
    }
  };

  updateExpectedTime = async (taskId: string, localExpectedTime: string): Promise<void> => {
    try {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          task.expectedTime = localExpectedTime;
        }
        return task;
      });

      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expectedTime: localExpectedTime })
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    } catch (error) {
      showErrorNotification('Ошибка обновления ожидаемого времени на сервере', error);
    }
  };

  updateTaskStatus = async (taskId: string, localStatus: string): Promise<void> => {
    try {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          task.status = localStatus;
        }
        return task;
      });

      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: localStatus })
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    } catch (error) {
      showErrorNotification('Ошибка обновления статуса задачи на сервере', error);
    }
  };

  updateTaskPriority = async (taskId: string, localPriority: string): Promise<void> => {
    try {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          task.priority = localPriority;
        }
        return task;
      });

      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ priority: localPriority })
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    } catch (error) {
      showErrorNotification('Ошибка обновления приоритета задачи на сервере', error);
    }
  };

  addTask = async (title: string, description: string, priority: string, expectedTime: string) => {
    const newTask = {
      id: uniqid(),
      title,
      description,
      priority,
      created: new Date().toISOString(),
      status: 'backlog',
      expectedTime,
      creator: localStorage.getItem('currentUser')
      //todo добавить ожидаемое время на выполнение задачи expectedTime: '',
      //todo добавить имя создателя задачи
    };

    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      })
      .catch((error) => {
        showErrorNotification('Ошибка при добавлении задачи', error);
      });

    this.tasks = [...this.tasks, newTask];
    this.taskForm = {
      title: '',
      description: '',
      priority: '',
      expectedTime: '',
      creator: ''
    };
  };

  changeFormValue = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    this.taskForm = { ...this.taskForm, [e.target.name]: e.target.value };
  };

  changeTaskDetailsValue = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    this.taskDetail = { ...this.taskDetail, [e.target.name]: e.target.value };
  };

  deleteTask = async (taskId: string): Promise<void> => {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);

    fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        console.log(`Задача ${taskId} успешно удалена на сервере`);
      })
      .catch((error) => {
        showErrorNotification('Ошибка удаления задачи на сервере', error);
      });
  };

  removeTasks = (): void => {
    this.tasks = [];
  };

  replaceListTasks = (dragIndex: number, hoverIndex: number): void => {
    const updatedTasks = [...this.tasks];
    const [draggedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    this.tasks = updatedTasks;
  };

  changeFormVisible = (isVisible: boolean): void => {
    this.taskForm.isVisible = isVisible;
  };

  changeTaskDetailDeleted = (isDeleted: boolean): void => {
    this.taskDetail.isDeleted = isDeleted;
  };

  changeTaskStatus = async (taskId: string, newStatus: string): Promise<void> => {
    const taskToUpdate = this.tasks.find((task) => task.id === taskId);

    if (taskToUpdate) {
      taskToUpdate.status = newStatus;
      this.tasks = [...this.tasks];

      fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
          }
        })
        .catch((error) => {
          showErrorNotification('Описание задачи не обновлено', error);
        });
    }
  };
}
