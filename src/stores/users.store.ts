import { makeAutoObservable } from 'mobx';
import uniqid from 'uniqid';
import React, { ChangeEvent } from 'react';
import { formatDate } from '../utils/helpers/utils';

interface User {
  id: string;
  login: string;
  rights: string;
  password: string;
  fullName: string;
  dateRegister: string;
}

interface UserDetail {
  fullName: string;
  password: string;
  login: string;
  rights: string;
}

interface UserRegForm {
  login: string;
  password: string;
  fullName: string;
}

interface UserLoginForm {
  login: string;
  password: string;
}

export class UsersStore {
  login: boolean = false;
  currentUser: User | null = null;
  users: User[] = [];
  userExistsError: boolean = false;
  userDetail: UserDetail = {
    fullName: '',
    password: '',
    login: '',
    rights: ''
  };
  userRegForm: UserRegForm = {
    login: '',
    password: '',
    fullName: ''
  };
  userLoginForm: UserLoginForm = {
    login: '',
    password: ''
  };

  constructor() {
    makeAutoObservable(this);

    const storedLogin: string | null = localStorage.getItem('login');
    const storedUserFullName: string | null = localStorage.getItem('currentUser');

    if (storedLogin) {
      this.login = JSON.parse(storedLogin);
    }

    if (storedUserFullName) {
      this.currentUser = {
        id: '',
        login: '',
        rights: '',
        password: '',
        fullName: JSON.parse(storedUserFullName),
        dateRegister: ''
      };
    }
  }

  updateUserFullName = async (userId: string, localFullName: string): Promise<void> => {
    try {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          user.fullName = localFullName;
        }
        return user;
      });

      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName: localFullName })
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ошибка обновления полного имени пользователя на сервере:', error.message);
      } else {
        console.error('Ошибка обновления полного имени пользователя на сервере:', error);
      }
    }
  };

  updatePassword = async (userId: string, localPassword: string): Promise<void> => {
    try {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          user.password = localPassword;
        }
        return user;
      });

      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: localPassword })
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ошибка обновления пароля на сервере:', error.message);
      } else {
        console.error('Ошибка обновления пароля на сервере:', error);
      }
    }
  };

  getUsers = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/users`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      this.users = await response.json();
    } catch (error) {
      const errorText: string = 'Ошибка при получении пользователей:';
      if (error instanceof Error) {
        console.error(errorText, error.message);
      }
    }
  };

  logOut = (): void => {
    this.login = false;
    this.currentUser = null;
    localStorage.removeItem('login');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserRights');
  };

  loginUser = (login: string, password: string): boolean => {
    try {
      const user = this.users.find((user) => user.login === login && user.password === password);
      if (user) {
        this.login = true;
        this.currentUser = user;
        localStorage.setItem('login', JSON.stringify(true));
        localStorage.setItem('currentUser', JSON.stringify(user.fullName));
        localStorage.setItem('currentUserId', user.id);
        localStorage.setItem('currentUserRights', user.rights);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      return false;
    }
  };

  checkUserExists = (login: string): boolean => {
    return this.users.some((user) => user.login === login);
  };

  getUser = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      const user = await response.json();
      this.userDetail = {
        fullName: user.fullName,
        password: user.password,
        login: user.login,
        rights: user.rights
      };
    } catch (error) {
      const errorText: string = 'Невозможно получить пользователя:';
      if (error instanceof Error) {
        console.error(errorText, error.message);
      }
    }
  };

  updateFullName = async (userId: string, localFullName: string): Promise<void> => {
    try {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          user.fullName = localFullName;
        }
        return user;
      });

      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName: localFullName })
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    } catch (error) {
      const errorText: string = 'Ошибка обновления имени пользователя:';
      if (error instanceof Error) {
        console.error(errorText, error.message);
      }
    }
  };

  addUser = async (login: string, password: string, fullName: string): Promise<void> => {
    if (this.checkUserExists(login)) {
      this.userExistsError = true;
      return;
    }

    const newUser: User = {
      id: uniqid(),
      login,
      rights: 'user',
      password,
      fullName,
      dateRegister: formatDate(new Date().toISOString())
    };

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      const data = await response.json();
      this.users = [...this.users, data];
      this.userExistsError = false;
    } catch (error) {
      const errorText: string = 'Ошибка при добавлении пользователя:';
      if (error instanceof Error) {
        console.error(errorText, error.message);
      }
    }

    this.userRegForm = {
      login: '',
      password: '',
      fullName: ''
    };
  };

  changeLoginFormValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.userLoginForm = { ...this.userLoginForm, [e.target.name]: e.target.value };
  };

  changeRegFormValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.userRegForm = { ...this.userRegForm, [e.target.name]: e.target.value };
  };

  changeUserDetailsValue = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    this.userDetail = { ...this.userDetail, [e.target.name]: e.target.value };
  };

  deleteUser = async (userId: string | null | undefined): Promise<void> => {
    const user = this.users.find((user) => user.id === userId);

    if (user && user.rights === 'admin') {
      alert(`Невозможно удалить пользователя с правами администратора`);
      return;
    }

    this.users = this.users.filter((user) => user.id !== userId);

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      console.log(`Юзер ${userId} успешно удален на сервере`);
    } catch (error) {
      const errorText: string = 'Ошибка удаления юзера на сервере:';
      if (error instanceof Error) {
        console.error(errorText, error.message);
      }
    }
  };
}
