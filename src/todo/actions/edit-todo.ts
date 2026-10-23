import axios from "axios";
import { apiUrl } from "../api/api-url";
import type { EditTodo } from "../interfaces/edit-todo.interface";
import type { Todo } from "../interfaces/todo.interface";

export const editTodo = async (data: EditTodo): Promise<Todo | undefined> => {
    try {
        const response = await apiUrl.put(`/api/todos/${data.id}`, data);

        return {
            hasBeenEdited: response.data.hasBeenEdited,
            title: response.data.title,
            task: response.data.task,
            createdAt: new Date(response.data.createdAt),
            completed: response.data.completed,
            id: response.data.id,
            user: response.data.user
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data.error ?? "An unexpected error occurred.");
        } else {
            console.log({error});
            alert("An unexpected error occurred.");
        }
    }
}