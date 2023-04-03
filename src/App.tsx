import React from "react";
import { Header } from "./components";
import { ThemeProvider } from "./context";
import { TodoList } from "./components/todoList";

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <TodoList />
    </ThemeProvider>
  );
};

export default App;
