import {useContext} from 'react';
import {observer} from "mobx-react-lite";
import Input from "../../ui/input/Input";
import {StoreContext} from "../../stores/root.store";
import './UserLogin.scss';
import Button from "../../ui/button/Button";

const UserLogin = () => {

    const {usersStore} = useContext(StoreContext);

    const handleChange = (e: any) => usersStore.changeLoginFormValue(e);

    const formSubmit = async () => {
        // todo
    };

    return (
        <div className="Login">
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
                <Button type="submit">Войти</Button>
            </form>
            <Button>Регистрация</Button>
        </div>
    )
}

export default observer(UserLogin);
