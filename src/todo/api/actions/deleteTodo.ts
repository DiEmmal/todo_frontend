import axios from "axios";

export const deleteTodo = async (id: string) => {
    const deletedTodo = await axios.delete(`https://todo-database-c5bde7a12cfd.herokuapp.com/api/todos/${id}`);
    return deletedTodo.data;
};