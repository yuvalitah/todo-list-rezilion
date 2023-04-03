import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TodoListReducer, TodoListFilterReducer } from "../redux/reducers";

export const store = configureStore({
  reducer: {
    TodoListReducer,
    TodoListFilterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
