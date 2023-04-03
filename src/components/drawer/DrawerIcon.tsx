import React from "react";
import { IconButton } from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

interface IDrawerIconProps {
  handleDrawerToggle: () => void;
}

export const DrawerIcon = ({ handleDrawerToggle }: IDrawerIconProps) => (
  <IconButton onClick={handleDrawerToggle}>
    <FormatListNumberedIcon fontSize="large" />
  </IconButton>
);
