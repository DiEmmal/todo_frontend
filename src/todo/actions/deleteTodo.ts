import axios from "axios";
import { apiUrl } from "../api/api-url";

export const deleteTodo = async (id: string) => {
    try {
        const response = await apiUrl.delete(`/api/todos/${id}`);

        if(response.status !== 200) {
            alert(response.data.error);
        }

        return response.data;
    } catch (error: unknown) {
        if(axios.isAxiosError(error)) {
            alert(error.response?.data.error ?? "An unexpected error occurred.");
        } else {
            alert("An unexpected error occurred.");
        }
    }
};