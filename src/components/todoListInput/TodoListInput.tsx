import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTodoAction } from "../../redux/actions";
import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "../../hooks";

export const TodoListInput = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();

  const handleOnChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setTitle(event.target.value),
    []
  );

  const addTodo = useCallback(() => {
    if (title) {
      dispatch(addTodoAction(title));
      openSnackbar("New Todo has been added!", "success");
      setTitle("");
    }
  }, [dispatch, title, openSnackbar]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      width="100%"
    >
      <TextField
        label="Add new Todo here..."
        value={title}
        onChange={handleOnChangeTitle}
        maxRows={3}
        multiline
        fullWidth
      />
      <Button variant="contained" onClick={addTodo} style={{ width: "20%" }}>
        Add!
      </Button>
    </Box>
  );
};
