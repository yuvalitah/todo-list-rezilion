import { Todo } from "../../types";
import { TodoListActionTypes } from "./ActionTypes";
import { TODO_ACTIONS } from "./Actions";

export const initializeTodos = (todos: Todo[]): TodoListActionTypes => ({
  type: TODO_ACTIONS.INITIALIZE_TODOS,
  payload: todos,
});

export const addTodo = (title: string): TodoListActionTypes => ({
  type: TODO_ACTIONS.ADD_TODO,
  payload: title,
});

export const deleteTodo = (id: number): TodoListActionTypes => ({
  type: TODO_ACTIONS.DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id: number): TodoListActionTypes => ({
  type: TODO_ACTIONS.TOGGLE_TODO,
  payload: id,
});
