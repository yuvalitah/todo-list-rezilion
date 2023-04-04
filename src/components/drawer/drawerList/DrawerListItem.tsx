import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { changeTodoListFilterAction } from "../../../redux/actions";

interface IDrawerListItem {
  title: string;
  filterIndex: number;
  changeSelectedFilter: (newActiveFilterIndex: number) => void;
}

export const DrawerListItem = ({
  title,
  filterIndex,
  changeSelectedFilter,
}: IDrawerListItem) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!localStorage.getItem("activeFilterIndex")) {
      localStorage.setItem("activeFilterIndex", "0");
    }
  }, []);

  const changeFilter = () => {
    localStorage.setItem("activeFilterIndex", filterIndex.toString());
    changeSelectedFilter(filterIndex);
  };

  return (
    <ListItem disablePadding key={title} onClick={changeFilter}>
      <ListItemButton
        sx={{ textAlign: "center", pl: 2.5 }}
        onClick={() => dispatch(changeTodoListFilterAction(title))}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: "h5" }}
        />
      </ListItemButton>
    </ListItem>
  );
};
