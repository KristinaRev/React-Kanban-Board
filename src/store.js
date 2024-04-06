import { createStore, combineReducers } from 'redux';
import tasksReducer from './reducers';

const rootReducer = combineReducers({
    tasks: tasksReducer,
});

const store = createStore(rootReducer);

export default store;
