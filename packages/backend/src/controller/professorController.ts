import {Request, Response} from "express";
import {Professores} from "../models/mongo";
import * as mongoose from "mongoose";
import {Utils} from "../routes/utils";

const SECRET = process.env.SECRET || "sleocgrient";

class ProfessorController {
    // HTTP Handlers
    public async insert(req: Request, res: Response) {
        let response = {};
        const professorBody = req.body;

        const nome = professorBody.nome;
        const sobrenome = professorBody.sobrenome;
        const email = professorBody.email;
        const senha = professorBody.senha;
        const confirmarSenha = professorBody.confirmarSenha;
        const sexo = professorBody.sexo;
        const dataNascimento = professorBody.dataNascimento;
        const telefone = professorBody.telefone;
        const endereco = professorBody.endereco;
        const formacoes = professorBody.formacoes;

        // Verifico se todos os campos foram preenchidos
        if (Utils.isStrValid(nome) && Utils.isStrValid(sobrenome) && Utils.isStrValid(email) && Utils.isStrValid(senha) && Utils.isStrValid(confirmarSenha) && Utils.isStrValid(sexo) && Utils.isStrValid(dataNascimento) && Utils.isStrValid(telefone) && Utils.isStrValid(endereco) && Utils.isStrValid(formacoes)) {
            // Verifico se a senha é igual a confirmação
            if (senha == confirmarSenha) {
                // Criptografo a senha para salvar
                const senhaHash = Utils.encryptPassword(senha);

                // Chamo o método que salva os dados no bd
                try {
                    const mongoInsertion = await ProfessorController.newProfessor(nome, sobrenome, email, senhaHash, sexo, dataNascimento, telefone, endereco, formacoes);
                    // Verifico se foi inserido
                    if (mongoInsertion.insertedCount > 0) {
                        response = {
                            success: true,
                            message: 'Cadastrado com sucesso'
                        };
                    } else {
                        response = {
                            success: false,
                            message: 'Erro interno no sistema, tente novamente'
                        };
                    }
                } catch (e) {
                    response = {
                        success: false,
                        message: 'Professor já cadastrado',
                        debugInfo: e
                    };
                }
            } else {
                response = {
                    success: false,
                    message: 'As senhas inseridas não conferem'
                };
            }
        } else {
            response = {
                success: false,
                message: 'Preencha todos os campos para continuar'
            };
        }

        res.send(response);
    }

    public async list(req: Request, res: Response) {
        res.send(await ProfessorController.listProfessores())
    }

    public async listById(req: Request, res: Response) {
        const id = req.params.id;
        const professor = await ProfessorController.listProfessores(id);
        if (professor) {
            res.send({
                success: true,
                professor: professor
            });
            return;
        }
        res.send({
            success: false,
            professor: {}
        });
    }

    public async update(req: Request, res: Response) {
        let response = {};

        const professorBody = req.body;

        const id = professorBody._id;
        const nome = professorBody.nome;
        const sobrenome = professorBody.sobrenome;
        const email = professorBody.email;
        const senha = professorBody.senha;
        const confirmarSenha = professorBody.confirmarSenha;
        const sexo = professorBody.sexo;
        const dataNascimento = professorBody.dataNascimento;
        const telefone = professorBody.telefone;
        const endereco = professorBody.endereco;
        const formacoes = professorBody.formacoes;

        let professorResponse;

        if (Utils.isStrValid(id) && Utils.isStrValid(nome) && Utils.isStrValid(sobrenome) && Utils.isStrValid(email) && Utils.isStrValid(sexo) && Utils.isStrValid(dataNascimento) && Utils.isStrValid(telefone) && Utils.isStrValid(endereco) && Utils.isStrValid(formacoes)) {
            // Verifico se a senha é igual a confirmação
            if (Utils.isStrValid(senha)) {
                if (Utils.isStrValid(confirmarSenha) && senha == confirmarSenha) {
                    // Criptografo a senha para salvar
                    const senhaHash = Utils.encryptPassword(senha);

                    professorResponse = await ProfessorController.updateProfessor(id, nome, sobrenome, email, sexo, dataNascimento, telefone, endereco, formacoes, senhaHash);
                    console.log(professorResponse);

                    if (professorResponse.n == professorResponse.ok) {
                        response = {
                            success: true,
                            message: 'Atualizado com sucesso!'
                        };
                    } else {
                        response = {
                            success: false,
                            message: 'Erro ao atualizar professor.'
                        };
                    }
                } else {
                    response = {
                        success: false,
                        message: 'As senhas inseridas não conferem'
                    };
                }
            } else {
                professorResponse = await ProfessorController.updateProfessor(id, nome, sobrenome, email, sexo, dataNascimento, telefone, endereco, formacoes);
                console.log(professorResponse);
                if (professorResponse.n == professorResponse.ok) {
                    response = {
                        success: true,
                        message: 'Atualizado com sucesso!'
                    };
                } else {
                    response = {
                        success: false,
                        message: 'Erro ao atualizar professor.'
                    };
                }
            }
        } else {
            response = {
                success: false,
                message: 'Preencha todos os campos para continuar'
            };
        }

        res.send(response);
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;
        const professor = await ProfessorController.deleteProfessor(id);
        if (professor == null) {
            res.send({
                success: false
            });
            return;
        }
        res.send({
            success: true
        });
    }

    // Interação com o banco de dados
    private static async newProfessor(nome: string, sobrenome: string, email: string, senha: string, sexo: string, dataNascimento: string, telefone: string, endereco: string, formacoes: string) {
        const ProfessoresMongo = mongoose.model('professores', Professores);

        const professor = new ProfessoresMongo({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            sexo: sexo,
            dataNascimento: dataNascimento,
            telefone: telefone,
            endereco: endereco,
            formacoes: formacoes
        });

        return await ProfessoresMongo.collection.insertOne(professor);
    }

    public async listProfessores(id?: string) {
        const ProfessoresMongo = mongoose.model('professores', Professores);

        // Adiciono o id à busca
        if (id != undefined && Utils.isStrValid(id)) {
            // Se o lenght for menor que 24, não é um objectID diferente
            if (id.length != 24)
                return false;
            // Listo professor com o id enviado
            return await ProfessoresMongo.findById(id);
        }
        // Listo todos os professores
        return await ProfessoresMongo.find({});
    }

    private static async listProfessores(id?: string) {
        const ProfessoresMongo = mongoose.model('professores', Professores);

        // Adiciono o id à busca
        if (id != undefined && Utils.isStrValid(id)) {
            // Se o lenght for menor que 24, não é um objectID diferente
            if (id.length != 24)
                return false;
            // Listo professor com o id enviado
            return await ProfessoresMongo.findById(id);
        }
        // Listo todos os professores
        return await ProfessoresMongo.find({});
    }

    private static async updateProfessor(id: string, nome: string, sobrenome: string, email: string, sexo: string, dataNascimento: string, telefone: string, endereco: string, formacoes: string, senha?: string) {
        const ProfessoresMongo = mongoose.model('professores', Professores);

        let professor = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            sexo: sexo,
            dataNascimento: dataNascimento,
            telefone: telefone,
            endereco: endereco,
            formacoes: formacoes
        };

        if (senha == null)
            delete professor.senha;

        return await ProfessoresMongo.updateOne({_id: id}, professor);
    }

    private static async deleteProfessor(id: string) {
        const ProfessoresMongo = mongoose.model('professores', Professores);

        if (id.length != 24)
            return false;
        // Apago o professor
        return await ProfessoresMongo.findByIdAndDelete(id);
    }
}

const professorController = new ProfessorController();
export default professorController;
