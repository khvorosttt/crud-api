import 'dotenv/config';
import { startServer } from './server/server';

console.log('Hello, world!');
startServer(process.env.PORT ?? '4000');
