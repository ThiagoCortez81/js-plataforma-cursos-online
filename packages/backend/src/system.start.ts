import express, {Application} from 'express';
import morgan from 'morgan';

import apiRoutes from "./routes/apiRoutes";
import {Mongoose} from "mongoose";
import config from "../config.json";
import {MongoClient} from "./database.start";

class Server {

    public app: Application;
    public mongoUrl = config.databaseConf.mongo.host;
    public mongoDatabase = config.databaseConf.mongo.database;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 8080);

        this.app.set('timeout', (30 * 60000));
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use(express.static(__dirname + '/../../../frontend/dist'));
        this.app.use('/api', apiRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), async () => {
            const connection: Mongoose = await MongoClient.mongoConnection;
            console.clear();
            console.info('+--------------------------------------------------------------------------+');
            console.log(`| Servidor PLATAFORMA CURSOS ONLINE rodando em http://localhost:${this.app.get('port')}/      |`);
            console.log(`| MongoDB conectado em 'mongodb://${this.mongoUrl}/${this.mongoDatabase}' com sucesso! |`);
            console.info('+--------------------------------------------------------------------------+');
            console.info('=================================== LOGS ===================================');
        });
    }
}

export const server = new Server();
server.start();
