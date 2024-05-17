import {TasksStore} from "./tasks.store";
import {createContext} from "react";

export class RootStore {
    tasksStore = new TasksStore();
}
export const StoreContext = createContext();
export const StoreProvider = StoreContext.Provider


//todo по возможности создать несколько юзеров, доска для задач будет для всех одна и так же сделать так чтоб можно было назначать ответственного над каждой задачей
