import Server from './configs/server.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new Server();

server.listenServer();