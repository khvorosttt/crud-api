import http from 'node:http';
import { methods, StatusCodes } from '../types/types';
import { handleGetRequest } from '../api/handleGetRequest';
import { correctURL } from '../utils/utils';
import { handlePostRequest } from '../api/handlePostRequest';
import { handlePutRequest } from '../api/handlePutRequest';
import { handleDeleteRequest } from '../api/handleDeleteRequest';
import { handleServerError } from '../api/handleServerError';

const startServer = (PORT: string) => {
    const server = http.createServer();

    server.on('request', (req, res) => {
        const { url, method } = req;
        if (correctURL(url ?? '')) {
            try {
                switch (method) {
                    case methods.GET:
                        console.log(`${methods.GET} ${url}`);
                        handleGetRequest(url ?? '', res);
                        break;
                    case methods.POST:
                        console.log(`${methods.POST} ${url}`);
                        handlePostRequest(req, res);
                        break;
                    case methods.PUT:
                        console.log(`${methods.PUT} ${url}`);
                        handlePutRequest(url ?? '', req, res);
                        break;
                    case methods.DELETE:
                        console.log(`${methods.DELETE} ${url}`);
                        handleDeleteRequest(url ?? '', res);
                        break;
                }
            } catch (err) {
                console.error(err);
                handleServerError(res);
            }
        } else {
            console.error('URL is not correсt');
            res.writeHead(StatusCodes.NOT_FOUND, {
                'Content-Type': 'application/json',
            });
            res.end(
                JSON.stringify({
                    message: 'Requests to non-existing endpoints.',
                }),
            );
        }
    });

    server.listen(PORT);
};

export { startServer };
