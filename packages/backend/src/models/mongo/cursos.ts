const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const Cursos = new Schema({
    nome: String,
    tema: String,
    descricao: String,
    valor: Schema.Types.Number,
    duracao: String,
    idProfessor: String,
    urlVideoaula: String
});
