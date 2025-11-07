interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

enum methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export { IUser, methods };
