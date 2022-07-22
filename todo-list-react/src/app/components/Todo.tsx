import { FC } from 'react'
import { ITodoItem } from '../../models/todo';

interface ITodo {
    todo: ITodoItem;
    toggleTodo: (id: string) => void;
}

const Todo: FC<ITodo> = ({todo, toggleTodo}) => {

    const handleTodoClick = () =>{
        toggleTodo(todo.id);
    };

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.completed} readOnly onChange={handleTodoClick}/>
            </label>
            {todo.name}
            
            </div>
    )
}

export default Todo;