import cluster from 'node:cluster';
import process from 'node:process';
import { availableParallelism } from 'node:os';
import { startServer } from './server';
import { IWorker } from '../types/types';
import { startBalancer } from './balancer';

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    const numWorkers = availableParallelism() - 1;
    const PORT = process.env.PORT ?? '4000';
    const workers: IWorker[] = [];

    for (let i = 1; i <= numWorkers; i++) {
        const workerPort = +PORT + i;
        workers.push({
            worker: cluster.fork({ PORT: workerPort }),
            PORT: workerPort.toString(),
        });
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
        const diedWorkerIndex = workers.findIndex(
            (item) => item.worker.process.pid === worker.process.pid,
        );
        if (diedWorkerIndex !== -1) {
            const newWorker = cluster.fork({ PORT: workers[diedWorkerIndex].PORT });

            workers.splice(diedWorkerIndex, 1, {
                worker: newWorker,
                PORT: workers[diedWorkerIndex].PORT,
            });
            console.log(`Worker recstarted with PID: ${newWorker.process.pid}`);
        }
    });
    startBalancer(workers, process.env.PORT ?? '4000');
} else {
    console.log(`Worker ${process.pid} started`);
    startServer(process.env.PORT ?? '4000');
}
