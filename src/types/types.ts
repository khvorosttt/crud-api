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

enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
}

export { IUser, methods, StatusCodes };
