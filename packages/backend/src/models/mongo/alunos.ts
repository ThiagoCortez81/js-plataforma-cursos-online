const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const Alunos = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    sexo: String,
    dataNascimento: String
});
