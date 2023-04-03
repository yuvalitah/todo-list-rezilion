import { TODO_ACTIONS } from "../actions";
import { Todo } from "../../types";
import { AnyAction } from "@reduxjs/toolkit";

interface ITodoListState {
  todos: Todo[];
}

const initialState: ITodoListState = {
  todos: [],
};

const getMaxId = (todos: Todo[]): number => {
  const maxId: number = todos.reduce((maxId, todo) => {
    return Math.max(todo.id, maxId);
  }, -1);

  return maxId + 1;
};

export const TodoListReducer = (
  state: ITodoListState = initialState,
  action: AnyAction
): ITodoListState => {
  switch (action.type) {
    case TODO_ACTIONS.INITIALIZE_TODOS:
      return {
        ...state,
        todos: action.payload.reverse(),
      };

    case TODO_ACTIONS.ADD_TODO:
      const newTodo: Todo = {
        id: getMaxId(state.todos),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [newTodo, ...state.todos],
      };

    case TODO_ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TODO_ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    default:
      return state;
  }
};
