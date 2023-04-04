import { styled, Paper, Box, useTheme, CircularProgress } from "@mui/material";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Todo, TodoListFilters } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { todoListFilterSelector, todosSelector } from "../../redux/selectors";
import { initializeTodosAction } from "../../redux/actions";
import { TodoItem } from "../todoItem";
import { TodoListInput } from "../todoListInput";

const API_ADDRESS = "https://jsonplaceholder.typicode.com/todos";
const TODOS_PER_PAGE = 15;

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
  borderRadius: 0,
}));

const getFilteredTodos = (todos: Todo[], activeFilter: string): Todo[] => {
  switch (activeFilter) {
    case TodoListFilters.All:
      return todos;

    case TodoListFilters.Completed:
      return todos.filter((todo) => todo.completed);

    case TodoListFilters.InCompleted:
      return todos.filter((todo) => !todo.completed);

    default:
      return todos;
  }
};

export const TodoList = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todosSelector).slice(0, page * TODOS_PER_PAGE);
  const activeFilter = useAppSelector(todoListFilterSelector);
  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, activeFilter),
    [activeFilter, todos]
  );
  const observer = useRef<IntersectionObserver>();
  const theme = useTheme();

  useEffect(() => {
    const fetchTodosFromAPI = async () => {
      setIsLoading(true);
      const response = await fetch(API_ADDRESS);
      const data: Todo[] = await response.json();
      dispatch(initializeTodosAction(data));
      setIsLoading(false);
    };

    fetchTodosFromAPI();
  }, [dispatch]);

  const lastTodoRef = useCallback(
    (elem: HTMLHeadingElement) => {
      if (isLoading) return;

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
    },
    [isLoading]
  );

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
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={4}>
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todoRef={todos.length === index + 1 ? lastTodoRef : undefined}
                todo={todo}
              />
            ))}
          </Box>
        )}
      </Box>
    </StyledPaper>
  );
};
