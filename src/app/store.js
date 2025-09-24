import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todosReducer from '../features/todos/todosSlice';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: { todos: todosReducer },
    middleware: (getDefault) => getDefault({ thunk: false }).concat(saga),
});

saga.run(rootSaga);
