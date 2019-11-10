import config from '../config.json';
import {Mongoose} from "mongoose";
const mongoose = require('mongoose');

export class MongoClient {
    // static mongoConnection: Mongoose = mongoose.connect(`mongodb://${config.databaseConf.mongo.host}/${config.databaseConf.mongo.database}`, {useNewUrlParser: true});
    static mongoConnection: Mongoose = mongoose.connect(`mongodb://${config.databaseConf.mongo.host}/${config.databaseConf.mongo.database}`, {
        useNewUrlParser: true,
        "auth": { "authSource": "admin" },
        "user": "admin",
        "pass": "abc123"
    });
}

