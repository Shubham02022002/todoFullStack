import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      desciption: "Go to gym from 9 to 10",
      completed: false,
    },
    {
      title: "Go to gym",
      desciption: "Go to gym from 9 to 10",
      completed: false,
    },
    {
      title: "Go to gym",
      desciption: "Go to gym from 9 to 10",
      completed: false,
    },
  ]);

  return (
    <>
      {todos.map((todo) => (
        <Todo
          title={todo.title}
          desciption={todo.desciption}
          completed={todo.completed}
        />
      ))}
    </>
  );
}

function Todo(todo) {
  console.log("from comp ", todo);
  return (
    <div>
      <h2>{todo.title}</h2>
      <h3>{todo.desciption}</h3>
      <span>{todo.completed}</span>
    </div>
  );
}

export default App;
