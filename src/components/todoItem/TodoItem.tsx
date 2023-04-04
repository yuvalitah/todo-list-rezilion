import React, { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  ClickAwayListener,
  Checkbox,
  Grow,
} from "@mui/material";
import { Todo } from "../../types";
import {
  changeTodoTitleAction,
  deleteTodoAction,
  toggleTodoAction,
} from "../../redux/actions";
import { useSnackbar, useAppDispatch } from "../../hooks";

interface ITodoProps {
  todo: Todo;
  todoRef?: (elem: HTMLHeadingElement) => void;
}

export const TodoItem = ({
  todo: { id, title, completed },
  todoRef,
}: ITodoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGrowAnimationActive, setIsGrowAnimationActive] = useState(true);
  const [todoTitle, setTodoTitle] = useState(title);
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();

  const handleOnChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    },
    []
  );

  const saveTodoTitle = () => {
    if (todoTitle) {
      dispatch(changeTodoTitleAction({ id, title: todoTitle }));
      setIsEditMode(false);
    }
  };

  const deleteTodo = () => {
    setIsGrowAnimationActive(false);
    setTimeout(() => dispatch(deleteTodoAction(id)), 500);
    openSnackbar("The Todo has been deleted from the list", "error");
  };

  return (
    <Grow in={isGrowAnimationActive} timeout={1000}>
      <Box display="flex" justifyContent="space-between" gap={2}>
        {isEditMode ? (
          <ClickAwayListener onClickAway={saveTodoTitle}>
            <TextField
              value={todoTitle}
              onChange={handleOnChangeTitle}
              fullWidth
              maxRows={3}
              multiline
            />
          </ClickAwayListener>
        ) : (
          <Typography
            width="100%"
            variant="body1"
            ref={todoRef}
            onClick={() => setIsEditMode(true)}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {title}
          </Typography>
        )}
        <Box display="flex" gap={1.5}>
          <Checkbox
            checked={completed}
            onChange={() => dispatch(toggleTodoAction(id))}
          />
          {isEditMode ? (
            <Button onClick={saveTodoTitle}>Save</Button>
          ) : (
            <Button
              onClick={() => setIsEditMode((prevIsEditMode) => !prevIsEditMode)}
            >
              Edit
            </Button>
          )}

          <Button color="error" onClick={deleteTodo}>
            X
          </Button>
        </Box>
      </Box>
    </Grow>
  );
};
