import { Worker } from 'node:cluster';

interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

interface IWorker {
    worker: Worker;
    PORT: string;
}

enum methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export { IUser, IWorker, methods, StatusCodes };
