'use strict';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;

        this.middlewares();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet);
        this.app.use(morgan('dev'));
    }

    listenServer(){
        this.app.listen(this.port, () => {
            console.log("Sucesfully Conection Server");
        });
    }

}

export default Server;