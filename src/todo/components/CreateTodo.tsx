import { useState } from "react";
import { createTodo } from "../api/actions/createTodo";
import type { Todo } from "../api/interfaces/todo.interface";

interface CreateTodoProps {
  setIsCreating: (isCreating: boolean) => void;
  getTodos: () => Promise<Todo[]>;
  setTodos: (todos: Todo[]) => void;
}

export function CreateTodo({
  setIsCreating,
  getTodos,
  setTodos,
}: CreateTodoProps) {
  const [title, setTitle] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const handleCreateTodo = () => {
    createTodo({ title, task, user }).then(() => {
      setIsCreating(false);
    });

    setTimeout(() => {
      getTodos().then((data) => {
        setTodos(data);
      });
    }, 1500);

    setTitle("");
    setTask("");
    setUser("");
  };

  return (
    <div className="bg-sky-400 p-8 rounded mt-4 flex flex-col gap-4 w-[90%] sm:w-1/2 lg:w-1/3 mx-auto transition-all duration-1000 min-h-72 items-center justify-center">
      <label>
        Title:{" "}
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="bg-sky-200 border border-sky-700 p-2 rounded-xl active:scale-95 transition-transform duration-200"
          placeholder="Enter title"
        />
      </label>
      <label>
        Task:{" "}
        <input
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          className="bg-sky-200 border border-sky-700 p-2 rounded-xl active:scale-95 transition-transform duration-200"
          placeholder="Enter task"
        />
      </label>
      <label>
        User:{" "}
        <input
          required
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type="text"
          className="bg-sky-200 border border-sky-700 p-2 rounded-xl active:scale-95 transition-transform duration-200"
          placeholder="Enter user"
        />
      </label>
      <button
        className="bg-red-300 border border-red-800 text-red-800 w-1/3 sm:w-1/4 lg:w-1/5 rounded"
        onClick={() => setIsCreating(false)}
      >
        Close
      </button>
      <button
        className="bg-green-300 border border-green-800 text-green-800 w-1/3 sm:w-1/4 lg:w-1/5 rounded"
        onClick={handleCreateTodo}
      >
        Create
      </button>
    </div>
  );
}
