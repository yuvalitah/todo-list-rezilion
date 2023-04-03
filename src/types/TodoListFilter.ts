export interface ITodoListFilters {
  All: string;
  Completed: string;
  InCompleted: string;
}

export const TodoListFilters: ITodoListFilters = {
  All: "All",
  Completed: "completed",
  InCompleted: "inCompleted",
};
