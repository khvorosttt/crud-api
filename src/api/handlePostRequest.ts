import http from 'node:http';
import { correctBody } from '../utils/utils';
import { v4 } from 'uuid';
import { IUser, StatusCodes } from '../types/types';
import { addUser } from '../users';
import { handleServerError } from './handleServerError';

const handlePostRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    let reqBody = '';
    req.on('data', (chunk) => {
        reqBody += chunk.toString();
    });
    req.on('end', () => {
        let body;
        try {
            body = JSON.parse(reqBody);
        } catch (err) {
            console.error(err);
            res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON format' }));
            return;
        }
        if (correctBody(body)) {
            const userID = v4();
            const newUser: IUser = {
                id: userID,
                ...body,
            };
            addUser(newUser);
            res.writeHead(StatusCodes.CREATED, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } else {
            res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Missing or invalid required fields' }));
        }
    });
    req.on('error', () => {
        handleServerError(res);
    });
};

export { handlePostRequest };
