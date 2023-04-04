import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { HeaderTitle } from "./HeaderTitle";
import { Drawer, DrawerIcon } from "../drawer";
import { ThemeToggle } from "../themeToggle";
import { TodoListHeaderFilters } from "./TodoListHeaderFilters";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () =>
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          flex={1}
          height="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <FormatListNumberedIcon fontSize="large" />
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <HeaderTitle />
            </Box>
          </Box>
          <Box
            sx={{ display: { xs: "flex", sm: "none" } }}
            justifyContent="center"
          >
            <DrawerIcon handleDrawerToggle={handleDrawerToggle} />
          </Box>
          <TodoListHeaderFilters />
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <ThemeToggle />
          </Box>
          <Drawer
            isOpen={isDrawerOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
