import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import Input from "../../ui/input/Input";
import {StoreContext} from "../../stores/root.store";
import './Register.scss';
import Button from "../../ui/button/Button";

const Register = () => {

    const {usersStore} = useContext(StoreContext);
    const [showPrompt, setShowPrompt] = useState(false);

    const handleChange = (e: any) => usersStore.changeRegFormValue(e);

    const formSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (usersStore.userRegForm.login && usersStore.userRegForm.password && usersStore.userRegForm.fullName) {
            await usersStore.addUser(usersStore.userRegForm.login, usersStore.userRegForm.password, usersStore.userRegForm.fullName);
            //todo вывести окно, что успешно зарегистрировался
        } else {
            setShowPrompt(true)
            // todo добавить подсказки
        }
    };

    return (
        <div className="Register">
            <h2>Регистрация</h2>
            <form onSubmit={formSubmit} className="form">
                <Input
                    id='userLogin'
                    name='login'
                    type='text'
                    placeholder='Введите логин'
                    onChange={handleChange}
                    value={usersStore.userLoginForm.login}
                    label='Логин'
                />
                <Input
                    id='userPassword'
                    name='password'
                    type='password'
                    placeholder='Введите пароль'
                    onChange={handleChange}
                    value={usersStore.userLoginForm.password}
                    label='Пароль'
                />
                <Input
                    id='userFullName'
                    name='fullName'
                    type='text'
                    placeholder='Введите полное имя'
                    onChange={handleChange}
                    value={usersStore.userLoginForm.fullName}
                    label='Имя'
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <Button>Войти</Button>
        </div>
    )
}

export default observer(Register);
