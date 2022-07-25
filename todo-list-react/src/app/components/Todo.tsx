import { FC } from "react";
import { ITodoItem } from "../../models/todo";
import Checkbox from '@mui/material/Checkbox';

interface ITodo {
  todo: ITodoItem;
  toggleTodo: (id: string) => void;
}

const Todo: FC<ITodo> = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  return (
    <div>
      <label>
        <Checkbox
          onChange={handleTodoClick}
          readOnly
          checked={todo.completed}
        ></Checkbox>
      </label>
      {todo.name}
    </div>
  );
};

export default Todo;
