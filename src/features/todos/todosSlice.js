import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todoList: [],       // [{ id, title, isCompleted }]
    isLoading: false,
    errorMessage: null,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setLoading(state, { payload }) {
            state.isLoading = payload;
            if (payload) state.errorMessage = null;
        },
        setError(state, { payload }) {
            state.errorMessage = payload || 'Сталася помилка';
            state.isLoading = false;
        },
        loadTodosSucceeded(state, { payload }) {
            state.todoList = payload || [];
            state.isLoading = false;
        },
        addTodoSucceeded(state, { payload }) {
            state.todoList.push(payload);
            state.isLoading = false;
        },
        removeTodoSucceeded(state, { payload: removedId }) {
            state.todoList = state.todoList.filter((x) => x.id !== removedId);
            state.isLoading = false;
        },
        toggleTodoSucceeded(state, { payload: toggledId }) {
            const item = state.todoList.find((x) => x.id === toggledId);
            if (item) item.isCompleted = !item.isCompleted;
            state.isLoading = false;
        },
        editTodoSucceeded(state, { payload }) {
            const { id, title } = payload;
            const item = state.todoList.find((x) => x.id === id);
            if (item) item.title = title;
            state.isLoading = false;
        },
        clearTodosSucceeded(state) {
            state.todoList = [];
            state.isLoading = false;
        },
    },
});

export const {
    setLoading, setError,
    loadTodosSucceeded, addTodoSucceeded, removeTodoSucceeded,
    toggleTodoSucceeded, editTodoSucceeded, clearTodosSucceeded,
} = todosSlice.actions;

export default todosSlice.reducer;

export const selectTodoList = (s) => s.todos.todoList;
export const selectIsLoading = (s) => s.todos.isLoading;
export const selectErrorMessage = (s) => s.todos.errorMessage;
