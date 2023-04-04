import React from "react";
import { Header } from "./components";
import { SnackbarProvider, ThemeProvider } from "./context";
import { TodoList } from "./components/todoList";

const App = () => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <Header />
        <TodoList />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
