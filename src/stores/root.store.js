import {TasksStore} from "./tasks.store";
import {createContext} from "react";

export class RootStore {
    tasksStore = new TasksStore();
}

// контекст стора, создаем его один раз, чтобы не плодить разных провайдеров и создаем рут стор, в который будем добавлять остальные сторы
export const StoreContext = createContext();

export const StoreProvider = StoreContext.Provider
