import { Tab, Tabs } from "@mui/material";
import React from "react";
import { ITodoListFilters, TodoListFilters } from "../../types";
import { useAppDispatch } from "../../hooks";
import { changeTodoListFilterAction } from "../../redux/actions";

interface ITodoListHeaderFilters {
  activeFilterIndex: number;
  changeSelectedFilter: (newActiveFilterIndex: number) => void;
}

export const TodoListHeaderFilters = ({
  activeFilterIndex,
  changeSelectedFilter,
}: ITodoListHeaderFilters) => {
  const dispatch = useAppDispatch();

  return (
    <Tabs
      value={+activeFilterIndex}
      onChange={(_, newActiveFilterIndex: number) =>
        changeSelectedFilter(newActiveFilterIndex)
      }
      sx={{ display: { xs: "none", sm: "flex" }, mt: 1 }}
    >
      {Object.keys(TodoListFilters).map((key) => (
        <Tab
          key={key}
          label={TodoListFilters[key as keyof ITodoListFilters]}
          onClick={() =>
            dispatch(
              changeTodoListFilterAction(
                TodoListFilters[key as keyof ITodoListFilters]
              )
            )
          }
        />
      ))}
    </Tabs>
  );
};
