'use strict';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { dbConnection } from './mongo.js';
import userPath from '../src/users/user.routes.js';
import authPath from '../src/auth/auth.routes.js';
import opinionPath from '../src/opinions/opinion.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.userPath = '/criticsLy/v1/user';
        this.authPath = '/criticsLy/v1/auth';
        this.opinionPath = '/criticsLy/v1/opinion'
        this.middlewares();
        this.conectDb();
        this.routes();
        global.loginID = '';
        global.token = '';
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    listenServer() {
        this.app.listen(this.port, () => {
            console.log("Sucesfully Conection Server");
        });
    }

    routes() {
        this.app.use(this.userPath, userPath);
        this.app.use(this.authPath, authPath);
        this.app.use(this.opinionPath, opinionPath);
    }

    async conectDb() {
        await dbConnection();
    }

}

export default Server;