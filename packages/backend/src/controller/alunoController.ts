import {Request, Response} from "express";
import {Alunos} from "../models/mongo";
import * as mongoose from "mongoose";
import {Utils} from "../routes/utils";
import {Schema} from "mongoose";

const SECRET = process.env.SECRET || "sleocgrient";

export class AlunoController {
    // HTTP Handlers
    public async insert(req: Request, res: Response) {
        let response = {};

        const alunoRequestBody = req.body;
        const nome = alunoRequestBody.nome;
        const sobrenome = alunoRequestBody.sobrenome;
        const email = alunoRequestBody.email;
        const senha = alunoRequestBody.senha;
        const confirmarSenha = alunoRequestBody.confirmarSenha;
        const sexo = alunoRequestBody.sexo;
        const dataNascimento = alunoRequestBody.dataNascimento;

        // Verifico se todos os campos foram preenchidos
        if (Utils.isStrValid(nome) && Utils.isStrValid(sobrenome) && Utils.isStrValid(email) && Utils.isStrValid(senha) && Utils.isStrValid(confirmarSenha) && Utils.isStrValid(sexo) && Utils.isStrValid(dataNascimento)) {
            // Verifico se a senha é igual a confirmação
            if (senha == confirmarSenha) {
                // Criptografo a senha para salvar
                const senhaHash = Utils.encryptPassword(senha);

                // Chamo o método que salva os dados no bd
                try {
                    const mongoInsertion = await AlunoController.newAluno(nome, sobrenome, email, senhaHash, sexo, dataNascimento);
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
                        message: 'Usuário já cadastrado',
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

    public async login(req: Request, res: Response) {
        const alunoRequestBody = req.body;
        const email = alunoRequestBody.login;
        const senha = Utils.encryptPassword(alunoRequestBody.senha);

        res.send(await AlunoController.listAlunosLogin(email, senha));
    }

    public async list(req: Request, res: Response) {
        res.send(await AlunoController.listAlunos())
    }

    public async listById(req: Request, res: Response) {
        const id = req.params.id;
        const aluno = await AlunoController.listAlunos(id);
        if (aluno) {
            res.send({
                success: true,
                aluno: aluno
            });
            return;
        }
        res.send({
            success: false,
            aluno: {}
        });
    }

    public async update(req: Request, res: Response) {
        let response = {};

        const alunoRequestBody = req.body;
        const id = alunoRequestBody._id;
        const nome = alunoRequestBody.nome;
        const sobrenome = alunoRequestBody.sobrenome;
        const email = alunoRequestBody.email;
        const senha = alunoRequestBody.senha;
        const confirmarSenha = alunoRequestBody.confirmarSenha;
        const sexo = alunoRequestBody.sexo;
        const dataNascimento = alunoRequestBody.dataNascimento;

        let alunoResponse;

        if (Utils.isStrValid(nome) && Utils.isStrValid(sobrenome) && Utils.isStrValid(email) && Utils.isStrValid(sexo) && Utils.isStrValid(dataNascimento)) {
            // Verifico se a senha é igual a confirmação
            if (Utils.isStrValid(senha)) {
                if (Utils.isStrValid(confirmarSenha) && senha == confirmarSenha) {
                    // Criptografo a senha para salvar
                    const senhaHash = Utils.encryptPassword(senha);

                    alunoResponse = await AlunoController.updateAluno(id, nome, sobrenome, email, sexo, dataNascimento, senhaHash);
                    if (alunoResponse.n == alunoResponse.ok) {
                        response = {
                            success: true,
                            message: 'Atualizado com sucesso!'
                        };
                    } else {
                        response = {
                            success: false,
                            message: 'Erro ao atualizar usuario.'
                        };
                    }
                } else {
                    response = {
                        success: false,
                        message: 'As senhas inseridas não conferem'
                    };
                }
            } else {
                alunoResponse = await AlunoController.updateAluno(id, nome, sobrenome, email, sexo, dataNascimento);
                if (alunoResponse.n == alunoResponse.ok) {
                    response = {
                        success: true,
                        message: 'Atualizado com sucesso!'
                    };
                } else {
                    response = {
                        success: false,
                        message: 'Erro ao atualizar usuario.'
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
        const aluno = await AlunoController.deleteAluno(id);
        if (aluno == null) {
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
    private static async newAluno(nome: string, sobrenome: string, email: string, senha: string, sexo: string, dataNascimento: string) {
        const AlunosMongo = mongoose.model('alunos', Alunos);

        const aluno = new AlunosMongo({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            sexo: sexo,
            dataNascimento: dataNascimento
        });

        return await AlunosMongo.collection.insertOne(aluno);
    }

    public static async listAlunos(id?: string) {
        const AlunosMongo = mongoose.model('alunos', Alunos);

        // Adiciono o id à busca
        if (id != undefined && Utils.isStrValid(id)) {
            // Se o lenght for menor que 24, não é um objectID diferente
            id = id.toString();
            if (id.length != 24)
                return false;
            // Listo usuario com o id enviado
            return await AlunosMongo.findById(id);
        }
        // Listo todos os cursos
        return await AlunosMongo.find({});
    }

    public static async listAlunosLogin(email: string, senha: string) {
        const AlunosMongo = mongoose.model('alunos', Alunos);

        // Listo todos os cursos
        return await AlunosMongo.find({email: email, senha: senha});
    }

    private static async updateAluno(id: string, nome: string, sobrenome: string, email: string, sexo: string, dataNascimento: string, senha?: string) {
        const AlunosMongo = mongoose.model('alunos', Alunos);

        let aluno = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            sexo: sexo,
            dataNascimento: dataNascimento
        };

        if (senha == null)
            delete aluno.senha;

        return await AlunosMongo.updateOne({_id: id}, aluno);
    }

    private static async deleteAluno(id: string) {
        const AlunosMongo = mongoose.model('alunos', Alunos);

        if (id.length != 24)
            return false;
        // Apago o usuario
        return await AlunosMongo.findByIdAndDelete(id);
    }
}

const alunoController = new AlunoController();
export default alunoController;
