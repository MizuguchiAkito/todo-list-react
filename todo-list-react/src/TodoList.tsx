import { FC } from "react";
import { ITodoItem } from "./models/todo";
import Todo from "./Todo";

interface ITodoList {
  todos: ITodoItem[];
  toggleTodo: (id: string) => void;
}

const TodoList: FC<ITodoList> = ({ todos, toggleTodo }) => {
  return (
    <>
      {
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))
      }
    </>
  );
};

export default TodoList;