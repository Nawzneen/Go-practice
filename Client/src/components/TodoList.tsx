import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
interface Todo {
  _id: number;
  body: string;
  completed: boolean;
}
const TodoList = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("data", data);
        if (response.ok) {
          setTodos(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  async function handleEdit(id: number) {
    console.log("id is supposed to be ", id);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
  async function handleDelete(id: number) {
    console.log("id is supposed to be ", id);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response delete", response);
      if (response.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-gray-200 p-5 mt-16 rounded-md">
      <h1 className="text-2xl my-5 font-bold">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="grid grid-cols-2 bg-green-800 text-white m-2 p-1 rounded-lg"
          >
            <div>{todo.body}</div>
            <div>
              <button className="mr-5" onClick={() => handleEdit(todo._id)}>
                {todo.completed ? (
                  <RiCheckboxCircleFill color="black" />
                ) : (
                  <RiCheckboxBlankCircleLine />
                )}
              </button>
              <button onClick={() => handleDelete(todo._id)}>
                <TiDeleteOutline />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
