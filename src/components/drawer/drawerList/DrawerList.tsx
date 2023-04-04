import React from "react";
import { List } from "@mui/material";
import { TodoListFilters } from "../../../types";
import { DrawerListItem } from "./DrawerListItem";

export const DrawerList = () => {
  return (
    <List>
      {Object.keys(TodoListFilters).map((filter) => (
        <DrawerListItem key={filter} title={filter} />
      ))}
    </List>
  );
};
