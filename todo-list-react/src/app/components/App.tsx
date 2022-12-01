import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
// uuid...ランダムなid自動生成

import { useState, useRef } from "react";
import { ITodoItem } from "../../models/todo";

//material ui
import {
  Box,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import ListIcon from "@mui/icons-material/List";

const classes = {
  formWrapper: {
    flexDirection: "row-reverse",
    textAlign: "center",
  },
  formContents: {
    width: "100%",
  },
  footerButtonWrapper: {
    justifyContent: "space-evenly",
  },
  pageFooterWrapper: {
    color: "white",
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    width: "100%",
    backgroundColor: "primary",
  },
  typographyStyles: {
    flex: 1,
  },
};

const App = () => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);

  const toggleTodo = (id: string) => {
    // タスクのチェック反転処理
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id) as ITodoItem;
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const todoNameRef = useRef<HTMLInputElement>(null);
  // 要素の参照処理

  const handleAddTodo = (_: React.MouseEvent) => {
    // タスクの追加処理
    const name = todoNameRef?.current?.value;
    console.log(name);
    if (!name) return;
    // タスクが空欄の時、タスクを追加しない処理
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = "";
  };

  const handleClear = () => {
    // タスクの削除処理
    const newTodos = todos.filter((todo) => !todo.completed);
    // チェックされているタスクだけ削除
    setTodos(newTodos);
  };

  const handleEdit = (_: React.MouseEvent) => {
    // タスクの編集
    const name = todoNameRef?.current?.value;
    if (!name) return;
    // タスクが空欄の時、タスクを変更しない処理

    const newTodos = [...todos];
    const todo = newTodos.filter((todo) => todo.completed === true);
    // filterで検索した値を全て格納
    if (todo.length > 1) {
      // todoの値が1より大きい場合変更不可
      return;
    } else {
      const todo = newTodos.find(
        (todo) => todo.completed === true
      ) as ITodoItem;
      todo.name = name;
      setTodos(newTodos);
    }
  };

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <AppBar position="static">
            <Toolbar>
              <Typography sx={classes.typographyStyles}>
                ToDo Task Application
              </Typography>
              <ListIcon />
              <Box>{todos.filter((todo) => !todo.completed).length}</Box>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>

      <Container maxWidth="md" sx={classes.formWrapper}>
        <Paper sx={{ padding: 3 }}>
          <Box sx={classes.formContents}>
            <TextField
              id=""
              label="Title"
              variant="filled"
              name=""
              inputRef={todoNameRef}
            />
            <br />
            <TextField
              id=""
              label="Content"
              variant="filled"
              name=""
              inputRef={todoNameRef}
            />
            <br />
            <TextField
              id=""
              size="medium"
              variant="filled"
              type="date"
              name=""
              inputRef={todoNameRef}
            />
          </Box>
        </Paper>
      </Container>

      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <Box sx={classes.pageFooterWrapper}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Add"
            color="primary"
            icon={<AddIcon />}
            onClick={handleAddTodo}
          />
          <BottomNavigationAction
            label="Clear"
            color="primary"
            icon={<DeleteIcon />}
            onClick={handleClear}
          />
          <BottomNavigationAction
            label="Edit"
            color="primary"
            icon={<EditIcon />}
            onClick={handleEdit}
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default App;
