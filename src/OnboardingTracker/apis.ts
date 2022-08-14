import Todo from "./models/Todo";
import User from "./models/User";


const apis = {
    getUsers: async (): Promise<User[]> => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
    
        return body;
    },
    getTodos: async (userId: number): Promise<Todo[]> => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
    
        return body;
    }
}

export default apis