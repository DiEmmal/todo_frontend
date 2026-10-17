import { apiUrl } from "../api/api-url";

export const deleteTodo = async (id: string) => {
    const deletedTodo = await apiUrl.delete(`/api/todos/${id}`);
    return deletedTodo.data;
};