import { TODO_LIST_FILTER_ACTIONS } from "../actions";
import { TodoListFilter } from "../../types";
import { AnyAction } from "@reduxjs/toolkit";

interface ITodoListFilterState {
  filter: string;
}

const initialState: ITodoListFilterState = {
  filter: TodoListFilter.All,
};

export const TodoListFilterReducer = (
  state: ITodoListFilterState = initialState,
  action: AnyAction
): ITodoListFilterState => {
  switch (action.type) {
    case TODO_LIST_FILTER_ACTIONS.CHANGE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};
