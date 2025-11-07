import http from 'node:http';
import { methods } from '../types/types';

const startServer = (PORT: string) => {
    const server = http.createServer();

    server.on('request', (req, res) => {
        const { url, method } = req;
        try {
            switch (method) {
                case methods.GET:
                    console.log(`${methods.GET} ${url}`);
                    break;
                case methods.POST:
                    console.log(`${methods.POST} ${url}`);
                    break;
                case methods.PUT:
                    console.log(`${methods.PUT} ${url}`);
                    break;
                case methods.DELETE:
                    console.log(`${methods.DELETE} ${url}`);
                    break;
            }
        } catch (err) {
            console.error(err);
        }
    });

    server.listen(PORT);
};

export { startServer };
