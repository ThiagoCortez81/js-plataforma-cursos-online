import {ObjectId} from "bson";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const Matriculas = new Schema({
    dataMatricula: String,
    dataFinalizacao: String,
    emAndamento: {type: Boolean},
    aluno: String,
    curso: String
});
