import React, { useState } from "react";
import { AppBar, Box, Toolbar, Tabs, Tab } from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { HeaderTitle } from "./HeaderTitle";
import { Drawer, DrawerIcon } from "../drawer";
import { ThemeToggle } from "../themeToggle";
import { ITodoListFilters, TodoListFilters } from "../../types";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);

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
          <Box sx={{ display: { xs: "none", sm: "flex" } }} alignItems="center">
            <FormatListNumberedIcon fontSize="large" />
            <HeaderTitle />
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <DrawerIcon handleDrawerToggle={handleDrawerToggle} />
          </Box>
          <Tabs
            value={activeFilterIndex}
            onChange={(_, newActiveFilterIndex) =>
              setActiveFilterIndex(newActiveFilterIndex)
            }
            sx={{ display: { sm: "none", md: "flex" }, mt: 1 }}
          >
            {Object.keys(TodoListFilters).map((key) => (
              <Tab
                key={key}
                label={TodoListFilters[key as keyof ITodoListFilters]}
              />
            ))}
          </Tabs>
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
