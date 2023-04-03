import { styled, Paper, TextField, Box, Button, useTheme } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Todo } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { todosSelector } from "../../redux/selectors";
import { initializeTodosAction, addTodoAction } from "../../redux/actions";

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
  const [text, setText] = useState("");
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

  const lastTodoRef = useCallback((elem: HTMLImageElement) => {
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

  const handleOnChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    []
  );

  const addTodo = useCallback(() => {
    if (text) {
      dispatch(addTodoAction(text));
    }
  }, [dispatch, text]);

  return (
    <StyledPaper>
      <Box
        display="flex"
        flexDirection="column"
        mt={5}
        sx={{ mx: theme.breakpoints.down("md") ? theme.spacing(5) : 0 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          width="100%"
        >
          <TextField
            label="Add new Todo here..."
            value={text}
            onChange={handleOnChangeText}
            maxRows={3}
            multiline
            fullWidth
          />
          <Button
            variant="contained"
            onClick={addTodo}
            style={{ width: "20%" }}
          >
            Add!
          </Button>
        </Box>
        {todos.map(({ id, title }, index) => (
          <h1 key={id} ref={todos.length === index + 1 ? lastTodoRef : null}>
            {title}
          </h1>
        ))}
      </Box>
    </StyledPaper>
  );
};
