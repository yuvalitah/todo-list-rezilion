import { styled, Paper, TextField, Box, Button, useTheme } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Todo } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { todosSelector } from "../../redux/selectors";
import { initializeTodos } from "../../redux/actions";

const API_ADDRESS = "https://jsonplaceholder.typicode.com/todos";

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
  borderRadius: 0,
}));

export const TodoList = () => {
  const [todoListItems, setTodoListItems] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const todosItems = useAppSelector(todosSelector);
  const observer = useRef<IntersectionObserver>();
  const theme = useTheme();

  useEffect(() => {
    const fetchTodosFromAPI = async () => {
      const response = await fetch(API_ADDRESS);
      const data: Todo[] = await response.json();
      dispatch(initializeTodos(data));
      setTodoListItems(data.slice(0, 2));
    };

    fetchTodosFromAPI();
  }, [dispatch]);

  const lastTodoRef = useCallback(
    (elem: HTMLImageElement) => {
      // if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          // Get the next page if we can see the last element on the screen
          if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1);
            setTodoListItems(todosItems.slice(0, page * 20));
          }
        },
        { rootMargin: "150px" }
      );

      if (elem) observer.current.observe(elem);
    },
    [page, todosItems]
  );

  const handleOnChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    []
  );

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
          <Button variant="contained" style={{ width: "20%" }}>
            Add!
          </Button>
        </Box>
        {todoListItems.map(({ id, title }, index) => (
          <h1
            key={id}
            ref={todoListItems.length === index + 1 ? lastTodoRef : null}
          >
            {title}
          </h1>
        ))}
      </Box>
    </StyledPaper>
  );
};
