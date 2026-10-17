import type { CreateTodo } from "../interfaces/create-todo.interface";
import { apiUrl } from "../api/api-url";

export const createTodo = async (data: CreateTodo) => {

    const createdTodo = await apiUrl.post("/api/todos", data);

    return createdTodo.data;

};