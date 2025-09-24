import { createAction } from '@reduxjs/toolkit';

export const requestLoadTodos = createAction('todos/requestLoadTodos');
export const requestAddTodo = createAction('todos/requestAddTodo');     // { title }
export const requestRemoveTodo = createAction('todos/requestRemoveTodo');  // { id }
export const requestToggleTodo = createAction('todos/requestToggleTodo');  // { id }
export const requestEditTodo = createAction('todos/requestEditTodo');    // { id, title }
export const requestClearTodos = createAction('todos/requestClearTodos');
