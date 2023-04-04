import React from "react";
import { List } from "@mui/material";
import { ITodoListFilters, TodoListFilters } from "../../../types";
import { DrawerListItem } from "./DrawerListItem";

interface IDrawerList {
  changeSelectedFilter: (newActiveFilterIndex: number) => void;
}

export const DrawerList = ({ changeSelectedFilter }: IDrawerList) => {
  return (
    <List>
      {Object.keys(TodoListFilters).map((filter, index) => (
        <DrawerListItem
          key={filter}
          title={TodoListFilters[filter as keyof ITodoListFilters]}
          filterIndex={index}
          changeSelectedFilter={changeSelectedFilter}
        />
      ))}
    </List>
  );
};
