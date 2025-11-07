import http from 'node:http';
import { correctBody } from '../utils/utils';
import { v4 } from 'uuid';
import { IUser, StatusCodes } from '../types/types';
import { addUser } from '../users';

const handlePostRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    let reqBody = '';
    req.on('data', (chunk) => {
        reqBody += chunk.toString();
    });
    req.on('end', () => {
        const body = JSON.parse(reqBody);
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
            res.writeHead(StatusCodes.BAD_REQUEST, 'Missing or invalid required fields');
            res.end();
        }
    });
};

export { handlePostRequest };
