import { Todo } from "../../types";
import { TodoListActionTypes, TodoListFilterActionTypes } from "./ActionTypes";
import { TODO_ACTIONS, TODO_LIST_FILTER_ACTIONS } from "./Actions";

export const initializeTodosAction = (todos: Todo[]): TodoListActionTypes => ({
  type: TODO_ACTIONS.INITIALIZE_TODOS,
  payload: todos,
});

export const addTodoAction = (title: string): TodoListActionTypes => ({
  type: TODO_ACTIONS.ADD_TODO,
  payload: title,
});

export const deleteTodoAction = (id: number): TodoListActionTypes => ({
  type: TODO_ACTIONS.DELETE_TODO,
  payload: id,
});

export const toggleTodoAction = (id: number): TodoListActionTypes => ({
  type: TODO_ACTIONS.TOGGLE_TODO,
  payload: id,
});

export const changeTodoTitleAction = ({
  id,
  title,
}: {
  id: number;
  title: string;
}): TodoListActionTypes => ({
  type: TODO_ACTIONS.CHANGE_TODO_TITLE,
  payload: {
    id,
    title,
  },
});

export const changeTodoListFilterAction = (
  filter: string
): TodoListFilterActionTypes => ({
  type: TODO_LIST_FILTER_ACTIONS.CHANGE_FILTER,
  payload: filter,
});
