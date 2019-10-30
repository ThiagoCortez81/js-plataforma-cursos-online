const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const Professores = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    sexo: String,
    dataNascimento: String,
    telefone: String,
    endereco: String,
    formacoes: String
});
