import {Request, Response} from "express";
import {Alunos, Cursos, Usuarios} from "../models/mongo";
import * as mongoose from "mongoose";
import {Utils} from "../routes/utils";
import {Schema} from "mongoose";
import professorController from "./professorController";

const SECRET = process.env.SECRET || "sleocgrient";

class CursoController {
    // HTTP Handlers
    public async insert(req: Request, res: Response) {
        let response = {};

        const cursoRequestBody = req.body;
        const nome = cursoRequestBody.nome;
        const tema = cursoRequestBody.tema;
        const descricao = cursoRequestBody.descricao;
        const valor = cursoRequestBody.valor;
        const duracao = cursoRequestBody.duracao;
        const idProfessor = cursoRequestBody.idProfessor;
        const urlVideoaula = cursoRequestBody.urlVideoaula;

        // Verifico se todos os campos foram preenchidos
        if (Utils.isStrValid(nome) && Utils.isStrValid(tema) && Utils.isStrValid(descricao) && Utils.isStrValid(valor) && Utils.isStrValid(duracao) && Utils.isStrValid(idProfessor) && Utils.isStrValid(urlVideoaula)) {
            // Verifico se o id do professor é valido
            let professorObj: any = await professorController.listProfessores(idProfessor);

            if (professorObj != null && professorObj != false) {
                // Chamo o método que salva os dados no bd
                try {
                    const mongoInsertion = await CursoController.newCurso(nome, tema, descricao, valor, duracao, idProfessor, urlVideoaula);
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
                        message: 'Curso já cadastrado',
                        debugInfo: e
                    };
                }
            } else {
                response = {
                    success: false,
                    message: 'Professor não existe.'
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
        const cursos: any = await CursoController.listCurso();
        let cursosMap: any = [];

        for (let curso of cursos) {
            let professor = await professorController.listProfessores(curso.idProfessor);
            cursosMap.push({curso, professor});
        }

        res.send(cursosMap);
    }

    public async listById(req: Request, res: Response) {
        const id = req.params.id;
        const curso: any = await CursoController.listCurso(id);
        if (curso) {
            curso['professorObj'] = await professorController.listProfessores(curso.idProfessor);

            res.send({
                success: true,
                curso: curso
            });
            return;
        }
        res.send({
            success: false,
            curso: {}
        });
    }

    public async update(req: Request, res: Response) {
        let response = {};

        const cursoRequestBody = req.body;
        const id = cursoRequestBody._id;
        const nome = cursoRequestBody.nome;
        const tema = cursoRequestBody.tema;
        const descricao = cursoRequestBody.descricao;
        const valor = cursoRequestBody.valor;
        const duracao = cursoRequestBody.duracao;
        const idProfessor = cursoRequestBody.idProfessor;
        const urlVideoaula = cursoRequestBody.urlVideoaula;

        // Verifico se todos os campos foram preenchidos
        if (Utils.isStrValid(nome) && Utils.isStrValid(tema) && Utils.isStrValid(descricao) && Utils.isStrValid(valor) && Utils.isStrValid(duracao) && Utils.isStrValid(idProfessor) && Utils.isStrValid(urlVideoaula)) {
            // Verifico se o id do professor é valido
            let professorObj: any = await professorController.listProfessores(idProfessor);

            if (professorObj.length > 0) {
                const cursoResponse = await CursoController.updateCurso(id, nome, tema, descricao, valor, duracao, idProfessor, urlVideoaula);
                if (cursoResponse.n == cursoResponse.ok) {
                    response = {
                        success: true,
                        message: 'Atualizado com sucesso!'
                    };
                } else {
                    response = {
                        success: false,
                        message: 'Erro ao atualizar cursos.'
                    };
                }
            } else {
                response = {
                    success: false,
                    message: 'Professor não existe.'
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

    public async delete(req: Request, res: Response) {
        const id = req.params.id;
        const curso = await CursoController.deleteCurso(id);
        if (curso == null) {
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
    private static async newCurso(nome: string, tema: string, descricao: string, valor: number, duracao: string, idProfessor: string, urlVideoaula: string) {
        const CursosMongo = mongoose.model('cursos', Cursos);

        const curso = new CursosMongo({
            nome: nome,
            tema: tema,
            descricao: descricao,
            valor: valor,
            duracao: duracao,
            idProfessor: idProfessor,
            urlVideoaula: urlVideoaula
        });

        return await CursosMongo.collection.insertOne(curso);
    }

    private static async listCurso(id?: string) {
        const CursosMongo = mongoose.model('cursos', Cursos);

        // Adiciono o id à busca
        if (id != undefined && Utils.isStrValid(id)) {
            // Se o lenght for menor que 24, não é um objectID diferente
            if (id.length != 24)
                return false;
            // Listo aluno com o id enviado
            return await CursosMongo.findById(id);
        }
        // Listo todos os alunos
        return await CursosMongo.find({});
    }

    private static async updateCurso(id: string, nome: string, tema: string, descricao: string, valor: number, duracao: string, idProfessor: string, urlVideoaula: string) {
        const CursosMongo = mongoose.model('cursos', Cursos);

        let usuario = {
            nome: nome,
            tema: tema,
            descricao: descricao,
            valor: valor,
            duracao: duracao,
            idProfessor: idProfessor,
            urlVideoaula: urlVideoaula
        };

        return await CursosMongo.updateOne({_id: id}, usuario);
    }

    private static async deleteCurso(id: string) {
        const CursosMongo = mongoose.model('cursos', Cursos);

        if (id.length != 24)
            return false;
        // Apago o aluno
        return await CursosMongo.findByIdAndDelete(id);
    }
}

const cursoController = new CursoController();
export default cursoController;
