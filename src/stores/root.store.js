import {TasksStore} from "./tasks.store";
import {UsersStore} from "./users.store";
import {createContext} from "react";

export class RootStore {
    tasksStore = new TasksStore();
    usersStore = new UsersStore();
}
export const StoreContext = createContext();
export const StoreProvider = StoreContext.Provider


// todo по возможности создать несколько юзеров, доска для задач будет для всех одна
// todo сделать так чтоб можно было назначать ответственного над каждой задачей
