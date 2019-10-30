import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import apiRoutes from "./routes/apiRoutes";
import {Mongoose} from "mongoose";
import config from "../config.json";
import {MongoClient} from "./database.start";

class Server {

    public app: Application;
    public mongoUrl = config.databaseConf.mongo.host;
    public mongoDatabase = config.databaseConf.mongo.database;
    public static _front_root_path = __dirname + '/../../../frontend/dist';

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 8080);

        this.app.set('timeout', (30 * 60000));
        this.app.use(cors()); // Apenas para dev do front, remover depois
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/api', apiRoutes);

        // Rotas para o frontend
        this.app.get('*.*', express.static(Server._front_root_path, {maxAge: '1y'}));
        this.app.all('*', function (req: any, res: any) {
            res.status(200).sendFile(`/`, {root: Server._front_root_path});
        });
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
