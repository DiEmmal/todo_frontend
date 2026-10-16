import { useEffect, useState } from "react";
import { getTodos } from "../api/actions/getTodos";
import type { Todo } from "../api/interfaces/todo.interface";
import { CreateTodo } from "./CreateTodo";

export function TodoContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const handleCreateNewTodo = () => {
    setIsCreating((prev) => !prev);
  };

  return (
    <section className="bg-linear-60 from-blue-300 to-sky-100 text-black p-4 w-full min-h-screen flex flex-col ">
      <button
        onClick={handleCreateNewTodo}
        className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded mx-auto active:scale-95 transition-transform duration-200 w-2/3 sm:w-1/4 lg:w-48 text-center"
      >
        {isCreating ? "Cancel" : "Create New Todo"}
      </button>

      {isCreating && (
        <CreateTodo
          setIsCreating={setIsCreating}
          getTodos={getTodos}
          setTodos={setTodos}
        />
      )}

      <div className="flex flex-col-reverse gap-4 mt-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-4 rounded shadow border border-gray-200 w-[90%] sm:w-1/2 lg:w-1/3 mx-auto hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p className="text-gray-600">{todo.task}</p>
            <p className="text-sm text-gray-500">
              Created: {todo.createdAt.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 text-right">@{todo.user}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
