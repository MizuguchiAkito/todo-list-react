import React from "react";
import Todo from "./Todo";

const Task =  ({ todo, toggleTodo }) => {
  return todo.map((todo) => (
  <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo}/>
  ));
};

export default Task;