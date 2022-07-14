import "./App.css";
import TodoList from "./TodoList";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
// uuid...ランダムなid自動生成

import React from "react";

const App = () => {

  const [todos, setTodos] = useState([]);

  const toggleTodo = (id) => {
    // タスクのチェック反転処理
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const todoNameRef = useRef();
    // 要素の参照処理
  

  const handleAddTodo = (e) => {
    // タスクの追加処理
    const name = todoNameRef.current.value;
    if (name === "") return;
    // タスクが空欄の時、タスクを追加しない処理

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const handleClear = () => {
    // タスクの削除処理
    const newTodos = todos.filter((todo) => !todo.completed);
    // チェックされているタスクだけ削除
    setTodos(newTodos);
  };

  return (
    <h2>
      <h3>Todoタスク管理</h3>
      <div>Remaining tasks : {todos.filter((todo) => !todo.completed).length}</div>
      <input type="text" name="" id="" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClear}>Del</button><br/>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </h2>
  );
};

export default App;