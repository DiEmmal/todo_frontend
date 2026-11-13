import type { Todo } from "../interfaces/todo.interface";
import { apiUrl } from "../api/api-url";

export interface TodoAPIResponse {
    pagination: Pagination;
    todos: Todo[];
}

interface Pagination {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: string | null;
    prevPage: string | null;
    total: number;
    totalPages: number;
}

export const getTodos = async (page: number, limit?: number, user?: string): Promise<TodoAPIResponse> => {

    const response = await apiUrl.get<TodoAPIResponse>("/api/todos/user", {
        params: {
            page: page,
            limit: limit ?? 10,
            user: user
        }
    });

    return {
        pagination: response.data.pagination,
        todos: response.data.todos.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
        })),
    };
}