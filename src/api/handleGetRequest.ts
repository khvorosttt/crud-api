import http from 'node:http';
import { StatusCodes } from '../types/types';
import { getUserById, users } from '../users';
import { validate as uuidValidate } from 'uuid';

const handleGetRequest = (url: string, res: http.ServerResponse) => {
    const returnALL = url.split('/').slice(1).length === 2;
    if (returnALL) {
        res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else {
        handleGetUser(url, res);
    }
};

const handleGetUser = (url: string, res: http.ServerResponse) => {
    const userId = url.split('/').slice(1)[2];
    if (uuidValidate(userId)) {
        const user = getUserById(userId);
        if (user) {
            res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(StatusCodes.NOT_FOUND, 'User not found');
            res.end();
        }
    } else {
        res.writeHead(StatusCodes.BAD_REQUEST, 'Invalid user id (not uuid)');
        res.end();
    }
};

export { handleGetRequest };
