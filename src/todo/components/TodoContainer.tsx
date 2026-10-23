import { useEffect, useState } from "react";
import { getTodos } from "../actions/getTodos";
import type { Todo } from "../interfaces/todo.interface";
import { CreateTodo } from "./CreateTodo";
import { TodoComponent } from "./Todo";

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

      <div className={`flex flex-col-reverse gap-4 mt-4`}>
        {
          todos.length > 0 ? (
            todos.map((todo) => (
              <TodoComponent
                key={todo.id}
                todo={todo}  
              />
            ))
          ) : (
            <TodoComponent key="no-todos" todo={{ id: "0", title: "No todos found", task: "Be the first in write a TODO", user: "System", completed: false, createdAt: new Date(), hasBeenEdited: false }} />
          )
        }
      </div>
    </section>
  );
}
