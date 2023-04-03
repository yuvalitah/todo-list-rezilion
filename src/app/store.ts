import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TodoListReducer } from "../redux/reducers/TodoListReducer";

export const store = configureStore({
  reducer: {
    TodoListReducer,
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
