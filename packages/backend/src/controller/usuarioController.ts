import {Request, Response} from "express";
import {Alunos, Usuarios} from "../models/mongo";
import * as mongoose from "mongoose";
import {Utils} from "../routes/utils";
import {Schema} from "mongoose";

const SECRET = process.env.SECRET || "sleocgrient";

class UsuarioController {
    // HTTP Handlers
    public async insert(req: Request, res: Response) {
        let response = {};

        const usuarioRequestBody = req.body;
        const nome = usuarioRequestBody.nome;
        const sobrenome = usuarioRequestBody.sobrenome;
        const email = usuarioRequestBody.email;
        const senha = usuarioRequestBody.senha;
        const confirmarSenha = usuarioRequestBody.confirmarSenha;
        const dataNascimento = usuarioRequestBody.dataNascimento;
        const sexo = usuarioRequestBody.sexo;

        // Verifico se todos os campos foram preenchidos
        if (Utils.isStrValid(nome) && Utils.isStrValid(sobrenome) && Utils.isStrValid(email) && Utils.isStrValid(senha) && Utils.isStrValid(confirmarSenha) && Utils.isStrValid(sexo) && Utils.isStrValid(dataNascimento)) {
            // Verifico se a senha é igual a confirmação
            if (senha == confirmarSenha) {
                // Criptografo a senha para salvar
                const senhaHash = Utils.encryptPassword(senha);

                // Chamo o método que salva os dados no bd
                try {
                    const mongoInsertion = await UsuarioController.newUsuario(nome, sobrenome, email, senhaHash, sexo, dataNascimento);
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

    public async list(req: Request, res: Response) {
        res.send(await UsuarioController.listUsuario())
    }

    public async listById(req: Request, res: Response) {
        const id = req.params.id;
        const usuario = await UsuarioController.listUsuario(id);
        if (usuario) {
            res.send({
                success: true,
                usuario: usuario
            });
            return;
        }
        res.send({
            success: false,
            usuario: {}
        });
    }

    public async update(req: Request, res: Response) {
        let response = {};

        const usuarioRequestBody = req.body;
        const id = usuarioRequestBody._id;
        const nome = usuarioRequestBody.nome;
        const sobrenome = usuarioRequestBody.sobrenome;
        const email = usuarioRequestBody.email;
        const senha = usuarioRequestBody.senha;
        const confirmarSenha = usuarioRequestBody.confirmarSenha;
        const dataNascimento = usuarioRequestBody.dataNascimento;
        const sexo = usuarioRequestBody.sexo;

        let alunoResponse;

        if (Utils.isStrValid(nome) && Utils.isStrValid(sobrenome) && Utils.isStrValid(email) && Utils.isStrValid(sexo) && Utils.isStrValid(dataNascimento)) {
            // Verifico se a senha é igual a confirmação
            if (Utils.isStrValid(senha)) {
                if (Utils.isStrValid(confirmarSenha) && senha == confirmarSenha) {
                    // Criptografo a senha para salvar
                    const senhaHash = Utils.encryptPassword(senha);

                    alunoResponse = await UsuarioController.updateUsuario(id, nome, sobrenome, email, sexo, dataNascimento, senhaHash);
                    if (alunoResponse.n == alunoResponse.ok) {
                        response = {
                            success: true,
                            message: 'Atualizado com sucesso!'
                        };
                    } else {
                        response = {
                            success: false,
                            message: 'Erro ao atualizar usuário.'
                        };
                    }
                } else {
                    response = {
                        success: false,
                        message: 'As senhas inseridas não conferem'
                    };
                }
            } else {
                alunoResponse = await UsuarioController.updateUsuario(id, nome, sobrenome, email, sexo, dataNascimento);
                if (alunoResponse.n == alunoResponse.ok) {
                    response = {
                        success: true,
                        message: 'Atualizado com sucesso!'
                    };
                } else {
                    response = {
                        success: false,
                        message: 'Erro ao atualizar usuário.'
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
        const aluno = await UsuarioController.deleteUsuario(id);
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
    private static async newUsuario(nome: string, sobrenome: string, email: string, senha: string, sexo: string, dataNascimento: string) {
        const UsuariosMongo = mongoose.model('usuarios', Usuarios);

        const usuario = new UsuariosMongo({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            sexo: sexo,
            dataNascimento: dataNascimento
        });

        return await UsuariosMongo.collection.insertOne(usuario);
    }

    private static async listUsuario(id?: string) {
        const UsuariosMongo = mongoose.model('usuarios', Usuarios);

        // Adiciono o id à busca
        if (id != undefined && Utils.isStrValid(id)) {
            // Se o lenght for menor que 24, não é um objectID diferente
            if (id.length != 24)
                return false;
            // Listo aluno com o id enviado
            return await UsuariosMongo.findById(id);
        }
        // Listo todos os alunos
        return await UsuariosMongo.find({});
    }

    private static async updateUsuario(id: string, nome: string, sobrenome: string, email: string, sexo: string, dataNascimento: string, senha?: string) {
        const UsuariosMongo = mongoose.model('usuarios', Usuarios);

        let usuario = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            sexo: sexo,
            dataNascimento: dataNascimento
        };

        if (senha == null)
            delete usuario.senha;

        return await UsuariosMongo.updateOne({_id: id}, usuario);
    }

    private static async deleteUsuario(id: string) {
        const UsuariosMongo = mongoose.model('usuarios', Usuarios);

        if (id.length != 24)
            return false;
        // Apago o aluno
        return await UsuariosMongo.findByIdAndDelete(id);
    }
}

const usuarioController = new UsuarioController();
export default usuarioController;
