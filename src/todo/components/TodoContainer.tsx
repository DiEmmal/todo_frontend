interface Todo {
  title: string;
  task: string;
  createdAt: Date;
  completed: boolean;
  id: string;
}

const mockTodos: Todo[] = [
  {
    title: "Todo 1",
    task: "Complete the project",
    createdAt: new Date(),
    completed: false,
    id: "1",
  },
  {
    title: "Todo 2",
    task: "Review the code",
    createdAt: new Date(),
    completed: false,
    id: "2",
  },
];

export function TodoContainer() {
  const handleCreateNewTodo = () => {
    alert("Todo creation functionality is not implemented yet.");
  };

  return (
    <section className="bg-linear-60 from-blue-300 to-sky-100 text-black p-4 w-full h-screen flex flex-col ">
      <button onClick={handleCreateNewTodo} className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded sm:w-fit mx-auto active:scale-95 transition-transform duration-200">
        Create New Todo
      </button>

      <div className="flex flex-col gap-4 mt-4">
        {mockTodos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-4 rounded shadow border border-gray-200 sm:w-1/2 lg:w-1/3 mx-auto hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p className="text-gray-600">{todo.task}</p>
            <p className="text-sm text-gray-500">
              Created: {todo.createdAt.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
