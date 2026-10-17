import type { Todo } from "../interfaces/todo.interface";
import { apiUrl } from "../api/api-url";

interface TodoAPIResponse {
    todos: Todo[];
}

export const getTodos = async (): Promise<Todo[]> => {

    const response = await apiUrl.get<TodoAPIResponse>("/api/todos");

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