import { useState } from "react";
import { deleteTodo } from "../actions/deleteTodo";
import type { Todo } from "../interfaces/todo.interface";
import { editTodo } from "../actions/edit-todo";

export function TodoComponent({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(todo.title);
  const [task, setTask] = useState<string>(todo.task);

  //TODO: Implement completed state functionality
  // const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleDeleteTodo = () => {
    deleteTodo(todo.id).then(() => {
      window.location.reload();
    });
  };

  const handleEditTodo = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (title.trim() === "" || task.trim() === "") {
      alert("Title and task cannot be empty.");
      return;
    }

    if (title === todo.title && task === todo.task) {
      alert("No changes made.");
      return;
    }

    editTodo({ id: todo.id, title, task, completed: todo.completed }).then(
      () => {},
    );

    setIsEditing(false);
  };

  return (
    <div className="relative bg-white p-4 rounded shadow border border-gray-200 w-[90%] sm:w-1/2 lg:w-1/3 mx-auto hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={isEditing ? handleCancelEdit : handleDeleteTodo}
        className="absolute top-2 right-2 text-red-700 px-1 rounded-lg hover:underline cursor-pointer"
      >
        {isEditing ? "Cancel" : "Delete"}
      </button>
      <button
        onClick={isEditing ? handleSaveEdit : handleEditTodo}
        className="absolute top-2 right-16 text-blue-700 px-1 rounded-lg hover:underline cursor-pointer"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      {isEditing ? (
        <div className="mt-4">
          <label>Title: <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-2 mt-2"
          /></label>
          <br />
          <label>Task: <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-gray-300 rounded p-2 mt-2"
          /></label>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">{todo.title}</h2>
          <p className="text-gray-600">{todo.task}</p>
        </div>
      )}
      <p className="text-sm text-gray-500">
        Created: {todo.createdAt.toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 text-right">@{todo.user}</p>
    </div>
  );
}
