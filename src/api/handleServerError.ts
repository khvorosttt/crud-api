import http from 'node:http';
import { StatusCodes } from '../types/types';

const handleServerError = (res: http.ServerResponse) => {
    res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, {
        'Content-Type': 'application/json',
    });
    res.end(
        JSON.stringify({
            message: `Interval server error.`,
        }),
    );
};

export { handleServerError };
