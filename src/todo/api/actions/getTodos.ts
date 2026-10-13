import axios from "axios"
import type { Todo } from "../../components/TodoContainer";

interface TodoAPIResponse {
    todos: Todo[];
}

export const getTodos = async (): Promise<Todo[]> => {

    const response = await axios.get<TodoAPIResponse>("https://todo-database-c5bde7a12cfd.herokuapp.com" + "/api/todos");

    return response.data.todos.map(
        todo => ({
            title: todo.title,
            task: todo.task,
            createdAt: new Date(todo.createdAt),
            completed: todo.completed,
            id: todo.id,
            user: todo.user
        })
    );

}