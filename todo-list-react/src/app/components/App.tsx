import "./App.css";
import TodoList from "./TodoList";
import Header from './Header';
import { v4 as uuidv4 } from "uuid";
// uuid...ランダムなid自動生成

import { useState, useRef } from "react";
import { ITodoItem } from "../../models/todo";

//material ui
import { Grid } from '@material-ui/core';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

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
      if(todo.length > 1){
    // todoの値が1より大きい場合変更不可
    // console.log("通ってる？")
        return;
      }else{
    // console.log("成功なり");
        const todo = newTodos.find((todo) => todo.completed === true) as ITodoItem;
        todo.name = name;
        setTodos(newTodos);
      }
  }

  return (
    // <Grid container direction="column">
    // <Grid item>
    //   <Header />
    // </Grid>
    <>
      <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      </Grid>
      <h3>Todoタスク管理</h3>
      <div>Remaining tasks : {todos.filter((todo) => !todo.completed).length}</div> {/* completedがTrueの時だけカウント */}
      <input type="text" name="" id="" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClear}>Del</button>
      <button onClick={handleEdit}>Edit</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  );
};

export default App;