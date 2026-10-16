import axios from "axios";
import type { Todo } from "../interfaces/todo.interface";
import type { CreateTodo } from "../interfaces/create-todo.interface";

export const createTodo = async (data: CreateTodo) => {
    const createdTodo = await axios.post<Todo>("https://todo-database-c5bde7a12cfd.herokuapp.com" + "/api/todos", data);
    console.log({ createdTodo });
    return createdTodo.data;
};