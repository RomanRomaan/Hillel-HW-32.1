import { all, call, put, takeLatest } from 'redux-saga/effects';
import { nanoid } from 'nanoid';
import {
    requestLoadTodos, requestAddTodo, requestRemoveTodo,
    requestToggleTodo, requestEditTodo, requestClearTodos,
} from './todosActions';
import {
    setLoading, setError, loadTodosSucceeded, addTodoSucceeded,
    removeTodoSucceeded, toggleTodoSucceeded, editTodoSucceeded, clearTodosSucceeded,
} from './todosSlice';
import {
    apiLoadTodos, apiAddTodo, apiRemoveTodo, apiToggleTodo, apiEditTodo, apiClearTodos,
} from './todosApi';

function* loadTodosWorker() {
    try {
        yield put(setLoading(true));
        const list = yield call(apiLoadTodos);
        yield put(loadTodosSucceeded(list));
    } catch (e) { yield put(setError(e.message)); }
}
function* addTodoWorker({ payload }) {
    try {
        yield put(setLoading(true));
        const newItem = { id: nanoid(), title: payload.title.trim(), isCompleted: false };
        const saved = yield call(apiAddTodo, newItem);
        yield put(addTodoSucceeded(saved));
    } catch (e) { yield put(setError(e.message)); }
}
function* removeTodoWorker({ payload }) {
    try {
        yield put(setLoading(true));
        const id = yield call(apiRemoveTodo, payload.id);
        yield put(removeTodoSucceeded(id));
    } catch (e) { yield put(setError(e.message)); }
}
function* toggleTodoWorker({ payload }) {
    try {
        yield put(setLoading(true));
        const id = yield call(apiToggleTodo, payload.id);
        yield put(toggleTodoSucceeded(id));
    } catch (e) { yield put(setError(e.message)); }
}
function* editTodoWorker({ payload }) {
    try {
        yield put(setLoading(true));
        const res = yield call(apiEditTodo, payload.id, payload.title.trim());
        yield put(editTodoSucceeded(res));
    } catch (e) { yield put(setError(e.message)); }
}
function* clearTodosWorker() {
    try {
        yield put(setLoading(true));
        yield call(apiClearTodos);
        yield put(clearTodosSucceeded());
    } catch (e) { yield put(setError(e.message)); }
}

export default function* todosSaga() {
    yield all([
        takeLatest(requestLoadTodos.type, loadTodosWorker),
        takeLatest(requestAddTodo.type, addTodoWorker),
        takeLatest(requestRemoveTodo.type, removeTodoWorker),
        takeLatest(requestToggleTodo.type, toggleTodoWorker),
        takeLatest(requestEditTodo.type, editTodoWorker),
        takeLatest(requestClearTodos.type, clearTodosWorker),
    ]);
}
