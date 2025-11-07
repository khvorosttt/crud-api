import http from 'node:http';
import { StatusCodes } from '../types/types';
import { validate as uuidValidate } from 'uuid';
import { deleteUserById } from '../users';

const handleDeleteRequest = (url: string, res: http.ServerResponse) => {
    const userId = url.split('/').slice(1)[2];
    if (uuidValidate(userId)) {
        const isDeleted = deleteUserById(userId);
        if (isDeleted) {
            res.writeHead(StatusCodes.NO_CONTENT, `User with ${userId} succesfully deleted`, {
                'Content-Type': 'application/json',
            });
            res.end();
        } else {
            res.writeHead(StatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User with ${userId} not found` }));
        }
    } else {
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user id (not uuid)' }));
        return;
    }
};

export { handleDeleteRequest };
