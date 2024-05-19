import {makeAutoObservable} from "mobx";
import uniqid from "uniqid";

export class UsersStore {
    constructor() {
        makeAutoObservable(this)
    }

    login = false

    users = [];

    userDetail = {
        fullName: '',
    }

    userRegForm = {
        login: '',
        password: '',
        fullName: ''
    }

    userLoginForm = {
        login: '',
        password: ''
    }

    getUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users`);
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
            this.users = await response.json();
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error.message);
        }
    }

    getUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            this.userDetail = await response.json();
        } catch (error) {
            console.error('Невозможно получить пользователя:', error.message);
        }
    }

    updateFullName = async (userId, localFullName) => {
        try {
            this.users = this.tasks.map(user => {
                if (user.id === userId) {
                    user.fullName = localFullName;
                }
                return user;
            });

            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName: localFullName }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Ошибка обновления имени пользователя:', error.message);
        }
    }

    addUser = async (login, password, fullName) => {
        const newUser = {
            id: uniqid(),
            login,
            password,
            fullName,
            dateRegister: new Date().toISOString(),
        };

        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
        }).catch((error) => {
            console.error('Error adding user:', error.message);
        });

        this.tasks = [...this.users, newUser];
        this.userRegForm = {
            login: '',
            password: '',
            fullName: ''
        };
    }

    changeLoginFormValue = (e) => {
        this.userLoginForm = ({...this.userLoginForm, [e.target.name]: e.target.value})
    }

    changeRegFormValue = (e) => {
        this.userRegForm = ({...this.userRegForm, [e.target.name]: e.target.value})
    }

    changeUserDetailsValue = (e) => {
        this.userDetail = ({...this.userDetail, [e.target.name]: e.target.value})
    }

    deleteUser = async (userId) => {
        this.users = this.users.filter(task => task.id !== userId);

        fetch(`http://localhost:3001/users/${userId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }
                console.log(`Юзер ${userId} успешно удален на сервере`);
            })
            .catch(error => console.error('Ошибка удаления юзера на сервере:', error.message))
    }
}
