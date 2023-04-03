import { styled, Paper, TextField, Box, Button, useTheme } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Todo } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { todosSelector } from "../../redux/selectors";
import { initializeTodosAction, addTodoAction } from "../../redux/actions";
import { TodoItem } from "../todoItem";
import { TodoListInput } from "../todoListInput";

const API_ADDRESS = "https://jsonplaceholder.typicode.com/todos";
const TODOS_PER_PAGE = 20;

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
  borderRadius: 0,
}));

export const TodoList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todosSelector).slice(0, page * TODOS_PER_PAGE);
  const observer = useRef<IntersectionObserver>();
  const theme = useTheme();

  useEffect(() => {
    const fetchTodosFromAPI = async () => {
      const response = await fetch(API_ADDRESS);
      const data: Todo[] = await response.json();
      dispatch(initializeTodosAction(data));
    };

    fetchTodosFromAPI();
  }, [dispatch]);

  const lastTodoRef = useCallback((elem: HTMLHeadingElement) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        // Get the next page if we can see the last element on the screen
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { rootMargin: "150px" }
    );

    if (elem) observer.current.observe(elem);
  }, []);

  return (
    <StyledPaper>
      <Box
        width="90%"
        height="100%"
        display="flex"
        flexDirection="column"
        mt={5}
        sx={{ mx: theme.breakpoints.down("md") ? theme.spacing(5) : 0 }}
        gap={5}
      >
        <TodoListInput />
        <Box display="flex" flexDirection="column" gap={4}>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todoRef={todos.length === index + 1 ? lastTodoRef : undefined}
              todo={todo}
            />
          ))}
        </Box>
      </Box>
    </StyledPaper>
  );
};
