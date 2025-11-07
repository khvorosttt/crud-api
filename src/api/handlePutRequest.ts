import http from 'node:http';
import { correctBody } from '../utils/utils';
import { validate as uuidValidate } from 'uuid';
import { StatusCodes } from '../types/types';
import { updateUser } from '../users';
import { handleServerError } from './handleServerError';

const handlePutRequest = (url: string, req: http.IncomingMessage, res: http.ServerResponse) => {
    const userId = url.split('/').slice(1)[2];
    if (uuidValidate(userId)) {
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
                const updatedUser = updateUser(userId, body);
                if (updatedUser) {
                    res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updatedUser));
                } else {
                    res.writeHead(StatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `User with ${userId} not found` }));
                }
            } else {
                res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing or invalid required fields' }));
            }
        });
        req.on('error', () => {
            handleServerError(res);
        });
    } else {
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user id (not uuid)' }));
        return;
    }
};

export { handlePutRequest };
