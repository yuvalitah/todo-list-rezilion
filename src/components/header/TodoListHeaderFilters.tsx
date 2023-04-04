import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { ITodoListFilters, TodoListFilters } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { changeTodoListFilterAction } from "../../redux/actions";

export const TodoListHeaderFilters = () => {
  const dispatch = useAppDispatch();
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);

  return (
    <Tabs
      value={activeFilterIndex}
      onChange={(_, newActiveFilterIndex) =>
        setActiveFilterIndex(newActiveFilterIndex)
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
