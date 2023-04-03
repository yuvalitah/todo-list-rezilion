import { Todo } from "../../types";
import { TodoListActionTypes } from "./ActionTypes";
import { TODO_ACTIONS } from "./Actions";

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

export const changeTodoTextAction = ({
  id,
  text,
}: {
  id: number;
  text: string;
}): TodoListActionTypes => ({
  type: TODO_ACTIONS.CHANGE_TODO_TEXT,
  payload: {
    id,
    text,
  },
});
