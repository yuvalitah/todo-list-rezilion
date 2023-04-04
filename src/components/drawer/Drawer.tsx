import React from "react";
import { Drawer as MuiDrawer, Divider, Box } from "@mui/material";
import { DrawerTitle } from "./DrawerTitle";
import { ThemeToggle } from "../themeToggle";
import { DrawerList } from "./drawerList";

interface IDrawerProps {
  isOpen: boolean;
  handleDrawerToggle: () => void;
  changeSelectedFilter: (newActiveFilterIndex: number) => void;
}

export const Drawer = ({
  isOpen,
  handleDrawerToggle,
  changeSelectedFilter,
}: IDrawerProps) => (
  <MuiDrawer
    variant="temporary"
    open={isOpen}
    onClose={handleDrawerToggle}
    sx={{
      display: { xs: "block", sm: "none" },
    }}
  >
    <Box display="flex" flexDirection="column" textAlign="center" flex={1}>
      <DrawerTitle closeDrawer={handleDrawerToggle} />
      <Divider />
      <DrawerList changeSelectedFilter={changeSelectedFilter} />
    </Box>
    <ThemeToggle />
  </MuiDrawer>
);
