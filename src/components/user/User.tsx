import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../stores/root.store";
import css from './User.module.css';
import Button from "../../ui/button/Button";
import {FaTimes} from "react-icons/fa";

interface UserProps {
    id: string;
    fullName: string;
    dateRegister: string;
    login: string;
}

const User: FC<UserProps> = (props) => {
    const { fullName, dateRegister, id, login } = props;
    const { usersStore } = useContext(StoreContext);

    const handleDelete = async () => {
        await usersStore.deleteUser(id);
    };

    return (
        <div className={css.container}>
            <div className={css.info}>
                <span className={css.name}>{fullName}</span>
                <span className={css.login}>{login}</span>
                <span className={css.date}>{dateRegister}</span>
            </div>
            <Button type="button" onClick={handleDelete}>
                <FaTimes />
            </Button>
        </div>
    );
};

export default observer(User);
