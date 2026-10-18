import { deleteTodo } from "../actions/deleteTodo";
import type { Todo } from "../interfaces/todo.interface";

export function TodoComponent({ todo }: { todo: Todo }) {
  const handleDeleteTodo = () => {
    deleteTodo(todo.id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div
      className="relative bg-white p-4 rounded shadow border border-gray-200 w-[90%] sm:w-1/2 lg:w-1/3 mx-auto hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <button
        onClick={handleDeleteTodo}
        className="absolute top-2 right-2 text-red-700 px-1 rounded-lg hover:underline"
      >
        Delete
      </button>
      <h2 className="text-xl font-bold">{todo.title}</h2>
      <p className="text-gray-600">{todo.task}</p>
      <p className="text-sm text-gray-500">
        Created: {todo.createdAt.toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 text-right">@{todo.user}</p>
    </div>
  );
}
