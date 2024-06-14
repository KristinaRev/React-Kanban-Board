import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { StoreContext } from "../../stores/root.store";
import { WithClassName } from "interfaces";
import './Register.scss';

const Register: React.FC<WithClassName> = () => {
    const { usersStore } = useContext(StoreContext);
    const [showPrompt, setShowPrompt] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        usersStore.changeRegFormValue(e);
    };

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { login, password, fullName } = usersStore.userRegForm;
        if (login && password && fullName) {
            await usersStore.addUser(login, password, fullName);
            // Todo: показать сообщение об успешной регистрации
        } else {
            setShowPrompt(true);
            // Todo: добавить подсказки или обработку ошибок
        }
    };

    return (
        <div className="Register">
            <form onSubmit={formSubmit} className="form">
                <Input
                    id='userLogin'
                    name='login'
                    type='text'
                    placeholder='Введите логин'
                    onChange={handleChange}
                    value={usersStore.userRegForm.login}
                    label='Логин'
                />
                <Input
                    id='userPassword'
                    name='password'
                    type='password'
                    placeholder='Введите пароль'
                    onChange={handleChange}
                    value={usersStore.userRegForm.password}
                    label='Пароль'
                />
                <Input
                    id='userFullName'
                    name='fullName'
                    type='text'
                    placeholder='Введите полное имя'
                    onChange={handleChange}
                    value={usersStore.userRegForm.fullName}
                    label='Имя'
                />
                <Button type="submit">Зарегистрироваться</Button>
            </form>
            <Button>Войти</Button>
        </div>
    );
};

export default observer(Register);
