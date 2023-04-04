import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { changeTodoListFilterAction } from "../../../redux/actions";
import { TodoListFilters, ITodoListFilters } from "../../../types";

interface IDrawerListItem {
  title: string;
}

export const DrawerListItem = ({ title }: IDrawerListItem) => {
  const dispatch = useAppDispatch();

  return (
    <ListItem disablePadding key={title}>
      <ListItemButton
        sx={{ textAlign: "center", pl: 2.5 }}
        onClick={() => dispatch(changeTodoListFilterAction(title))}
      >
        <ListItemText
          primary={TodoListFilters[title as keyof ITodoListFilters]}
          primaryTypographyProps={{ variant: "h5" }}
        />
      </ListItemButton>
    </ListItem>
  );
};
