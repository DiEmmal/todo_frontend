import { useOptimistic, useState, useTransition } from "react";
import { deleteTodo } from "../actions/deleteTodo";
import type { Todo } from "../interfaces/todo.interface";
import { editTodo } from "../actions/edit-todo";

interface TodoComponentProps {
  todo: Todo;
  optimisticUpdate?: boolean;
}

export function TodoComponent({ todo }: TodoComponentProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(todo.title);
  const [task, setTask] = useState<string>(todo.task);

  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    { ...todo, isSaving: false },
    (current, newValues: { title?: string; task?: string }) => {
      return { ...current, ...newValues, isSaving: true };
    },
  );

  //TODO: Implement completed state functionality
  // const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleDeleteTodo = () => {

    if(localStorage.getItem('username') !== todo.user) {
      alert("You can't delete someone else's todo.");
      return;
    }

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
    if(localStorage.getItem('username') !== todo.user) {
      alert("You can't edit someone else's todo.");
      setIsEditing(false);
      return;
    }

    if (title.trim() === "" || task.trim() === "") {
      alert("Title and task cannot be empty.");
      return;
    }

    if (title === todo.title && task === todo.task) {
      alert("No changes made.");
      return;
    }

    setIsEditing(false);

    startTransition(async () => {
      setOptimisticTodo({ title, task });
      await editTodo({ id: todo.id, title, task, completed: todo.completed });
    });
  };

  return (
    <div className="relative bg-white p-4 rounded shadow border border-gray-200 w-[90%] sm:w-1/2 lg:w-1/3 mx-auto hover:shadow-lg transition-shadow duration-300">
      <button
        disabled={isPending}
        onClick={isEditing ? handleCancelEdit : handleDeleteTodo}
        className="absolute top-2 right-2 text-red-700 px-1 rounded-lg hover:underline cursor-pointer"
      >
        {isEditing ? "Cancel" : "Delete"}
      </button>
      <button
        disabled={isPending}
        onClick={isEditing ? handleSaveEdit : handleEditTodo}
        className="absolute top-2 right-16 text-blue-700 px-1 rounded-lg hover:underline cursor-pointer"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      {isEditing ? (
        <div className="mt-4">
          <label>
            Title:{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded p-2 mt-2"
            />
          </label>
          <br />
          <label>
            Task:{" "}
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="border border-gray-300 rounded p-2 mt-2"
            />
          </label>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            {optimisticTodo.title}
            {optimisticTodo.isSaving && (
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full animate-pulse">
                Saving...
              </span>
            )}
          </h2>
          <p className="text-gray-600">{optimisticTodo.task}</p>
        </div>
      )}
      <p className="text-sm text-gray-500">
        Created: {todo.createdAt.toLocaleDateString()}
      </p>
      {todo.hasBeenEdited ? (
        <div className="flex justify-between items-center">
          <p className="inline text-gray-500">Edited</p>
          <p className="inline text-gray-500">{`@${todo.user}`}</p>
        </div>
      ) : (
        <p className="text-gray-500 text-right ">{`@${todo.user}`}</p>
      )}
    </div>
  );
}
