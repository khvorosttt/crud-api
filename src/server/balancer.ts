import http from 'node:http';
import { IWorker } from '../types/types';
import { handleServerError } from '../api/handleServerError';

const startBalancer = (workers: IWorker[], balancerPort: string) => {
    let currentWorkerIndex = 0;
    const balancer = http.createServer((req, res) => {
        const currentWorker = workers[currentWorkerIndex];
        currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;
        const options = {
            hostname: 'localhost',
            port: currentWorker.PORT,
            path: req.url,
            method: req.method,
        };

        const workReq = http.request(options, (workRes) => {
            res.writeHead(workRes.statusCode!, workRes.headers);
            workRes.pipe(res);
        });

        workReq.on('error', () => {
            handleServerError(res);
        });

        req.pipe(workReq);
    });

    balancer.listen(balancerPort, () => {
        console.log(`Load balancer running on port ${balancerPort}`);
    });
};

export { startBalancer };
