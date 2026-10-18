import type { CreateTodo } from "../interfaces/create-todo.interface";
import { apiUrl } from "../api/api-url";
import axios from "axios";

export const createTodo = async (data: CreateTodo) => {

    try {
        
        const createdTodo = await apiUrl.post("/api/todos", data);
        
        if(createdTodo.status !== 201) alert(createdTodo.data.error);
        
        return createdTodo.data;
    } catch (error: unknown) {
        
        if(axios.isAxiosError(error)) {
            alert(error.response?.data.error ?? "An unexpected error occurred.");
        } else {
            alert("An unexpected error occurred.");
        }

    }

};