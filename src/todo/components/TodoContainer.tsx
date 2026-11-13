import { useEffect, useState } from "react";
import { getTodos } from "../actions/getTodosByUser";
import type { Todo } from "../interfaces/todo.interface";
import { CreateTodo } from "./CreateTodo";
import { TodoComponent } from "./Todo";

const user = localStorage.getItem("username") || undefined;

export function TodoContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>();
  const [totalTodos, setTotalTodos] = useState<number>(0);

  const handleFetchTodos = () => {

    getTodos(page, undefined, user).then((data) => {
      setTodos(data.todos);
      setTotalPages(data.pagination.totalPages);
      setLimit(data.pagination.limit);
      setTotalTodos(data.pagination.total);
    });
  };

  useEffect(() => {
    handleFetchTodos();
  }, []);

  const handlePrevPageClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      getTodos(page - 1).then((data) => {
        setTodos(data.todos);
      });
    }

    return;
  };

  const handleNextPageClick = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      getTodos(page + 1).then((data) => {
        setTodos(data.todos);
      });
    }

    return;
  };

  const handleCreateNewTodo = () => {
    if (!localStorage.getItem("username")) {
      alert("Please login first to create a new todo.");
      return;
    }

    setIsCreating((prev) => !prev);
  };

  return (
    <section className=" text-black p-4 w-full min-h-screen flex flex-col ">
      <button
        onClick={handleCreateNewTodo}
        className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded mx-auto active:scale-95 transition-transform duration-200 w-2/3 sm:w-1/4 lg:w-48 text-center"
      >
        {isCreating ? "Cancel" : "Create New Todo"}
      </button>

      {isCreating && (
        <CreateTodo
          setIsCreating={setIsCreating}
          getTodos={() => getTodos(page, undefined, user)}
          setTodos={setTodos}
        />
      )}

      <div className={`flex flex-col gap-4 mt-4`}>
        {todos.length > 0 ? (
          todos.map((todo) => <TodoComponent key={todo.id} todo={todo} />)
        ) : (
          <TodoComponent
            key="no-todos"
            todo={{
              id: "0",
              title: "No todos found",
              task: "Be the first in write a TODO",
              user: "System",
              completed: false,
              createdAt: new Date(),
              hasBeenEdited: false,
            }}
          />
        )}
        <div className="flex justify-between mt-4 w-full px-4 mx-auto sm:w-1/2 lg:w-1/3 text-sky-700 font-bold">
          <span className="cursor-pointer" onClick={handlePrevPageClick}>
            Prev Page
          </span>
          <div className="flex flex-col items-center">
            <span>Total pages: {totalPages}</span>
            <span>Limit: {limit}</span>
            <span>Current page: {page}</span>
            <span>Total todos: {totalTodos}</span>
          </div>
          <span className="cursor-pointer" onClick={handleNextPageClick}>
            Next Page
          </span>
        </div>
      </div>
    </section>
  );
}
