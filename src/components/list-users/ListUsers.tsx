import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../stores/root.store";
import css from './ListUsers.module.css';
import User from "../user/User";

const ListUsers: FC = () => {
    const { usersStore } = useContext(StoreContext);

    return (
        <div className={css.container}>
            {
                usersStore.users.map(user => (
                    <User
                        key={user.id}
                        id={user.id}
                        dateRegister={user.dateRegister}
                        fullName={user.fullName}
                        login={user.login}
                    />
                ))
            }
        </div>
    );
};

export default observer(ListUsers);

