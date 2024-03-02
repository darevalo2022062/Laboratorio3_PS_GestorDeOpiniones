'use strict';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import moment from 'moment-timezone';
import { dbConnection } from './mongo.js';
import userPath from '../src/users/user.routes.js';
import authPath from '../src/auth/auth.routes.js';
import opinionPath from '../src/opinions/opinion.routes.js';
import commentPath from '../src/comments/comment.routes.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.userPath = '/criticsLy/v1/user';
        this.authPath = '/criticsLy/v1/auth';
        this.opinionPath = '/criticsLy/v1/opinion';
        this.commentPath = '/criticsLy/v1/comment'
        this.middlewares();
        this.conectDb();
        this.routes();
        const zonaHoraria = 'America/Guatemala';
        moment.tz.setDefault(zonaHoraria);
        global.loginID = '';
        global.token = '';
        global.commentID = '';
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
        this.app.use(this.commentPath, commentPath);
    }

    async conectDb() {
        await dbConnection();
    }

}

export default Server;