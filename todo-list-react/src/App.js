import React,{ useState, useRef} from "react";
import Task from "./Task";
import {v4 as uuidv4 } from 'uuid'; //ユニークなid生成

function App() {

  const [todo, setTodos] = useState([{id:1, name:"Todo1",completed:false}]);
  //State

  const todoNameRef = useRef();

  const handleAddTodo = ()=>{
    //タスクを追加する
    const name = todoNameRef.current.value;
    setTodos((prevtodos)=>{
      return[...prevtodos, {id:uuidv4(), name:name, completed:false}];
      //... <- スプレッド構文
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) =>{
    const newTodos = [...todo];
    const todo = newTodos.find((todo) => todo.id === id);
    //find->todo.idを引数とひとつづつ照らし合わせる
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  return (
    <>
      <Task todo={todo} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>タスクを追加</button>
    </>
  );
}

export default App;
