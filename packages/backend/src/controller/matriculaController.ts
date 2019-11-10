import {Request, Response} from "express";
import {Matriculas} from "../models/mongo";
import * as mongoose from "mongoose";
import {Utils} from "../routes/utils";
import professorController from "./professorController";
import {AlunoController} from "./alunoController";
import cursoController from "./cursoController";

const SECRET = process.env.SECRET || "sleocgrient";

class MatriculaController {
    // HTTP Handlers
    public async insert(req: Request, res: Response) {
        let response = {};

        const matriculaRequestBody = req.body;
        const dataMatricula = new Date().toISOString();
        const emAndamento = true;
        const aluno = matriculaRequestBody.aluno;
        const cursoID = matriculaRequestBody.curso;

        // Verifico se todos os campos foram preenchidos
        if (Utils.isStrValid(aluno) && Utils.isStrValid(cursoID)) {
            // Verifico se o id do aluno e do curso são validos
            let alunoObj: any = await AlunoController.listAlunos(aluno);
            let cursoObj: any = await cursoController.listByIdInternal(cursoID);

            if (alunoObj && cursoObj) {
                // Chamo o método que salva os dados no bd
                try {
                    const mongoInsertion = await MatriculaController.newMatricula(dataMatricula, null, emAndamento, aluno, cursoID);
                    // Verifico se foi inserido
                    if (mongoInsertion.insertedCount > 0) {
                        response = {
                            success: true,
                            message: 'matriculado com sucesso'
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
                        message: 'Já matriculado',
                        debugInfo: e
                    };
                }
            } else {
                response = {
                    success: false,
                    message: 'Aluno ou Curso são inválidos.'
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
        const matriculas: any = await MatriculaController.listMatricula();
        let matriculasMap: any = [];

        for (let matricula of matriculas) {
            let aluno: any = await AlunoController.listAlunos(matricula.aluno);
            let curso: any = await cursoController.listByIdInternal(matricula.curso);
            let professor = null;
            if (curso != null)
                professor = await professorController.listProfessores(curso.idProfessor);
            matriculasMap.push({matricula, aluno, curso, professor});
        }

        res.send(matriculasMap);
    }

    public async listById(req: Request, res: Response) {
        const id = req.params.id;
        const matricula: any = await MatriculaController.listMatricula(id);
        if (matricula) {
            let aluno: any = await AlunoController.listAlunos(matricula.aluno);
            let curso: any = await cursoController.listByIdInternal(matricula.curso);
            let professor = null;
            if (curso != null)
                professor = await professorController.listProfessores(curso.idProfessor);

            res.send({
                success: true,
                matricula: matricula,
                aluno: aluno,
                curso: curso,
                professor: professor
            });
            return;
        }
        res.send({
            success: false,
            aluno: {},
            curso: {},
            professor: {}
        });
    }

    public async listByIdAluno(req: Request, res: Response) {
        const id = req.params.id;
        const matriculas: any = await MatriculaController.listMatriculaPorAluno(id);
        const listMatriculas: any[] = [];

        if (matriculas) {
            for (let matricula of matriculas) {
                let aluno: any = await AlunoController.listAlunos(matricula.aluno);
                let curso: any = await cursoController.listByIdInternal(matricula.curso);
                let professor = null;
                if (curso != null)
                    professor = await professorController.listProfessores(curso.idProfessor);

                listMatriculas.push({
                    matricula: matricula,
                    aluno: aluno,
                    curso: curso,
                    professor: professor
                })
            }

            res.send({
                success: true,
                listMatriculas: listMatriculas
            });
            return;
        }
        res.send({
            success: false,
            listMatriculas: []
        });
    }

    public async update(req: Request, res: Response) {
        let response = {};

        const cursoRequestBody = req.body;
        const id = cursoRequestBody._id;
        const emAndamento = cursoRequestBody.emAndamento;
        const dataFinalizacao = cursoRequestBody.dataFinalizacao;
        const aluno = cursoRequestBody.aluno;
        const curso = cursoRequestBody.curso;

        // Verifico se o id do aluno e do curso são validos
        let alunoObj: any = await AlunoController.listAlunos(aluno);
        let cursoObj: any = await cursoController.listByIdInternal(curso);

        if (alunoObj != null && cursoObj != false) {
            // Chamo o método que salva os dados no bd
            try {
                const mongoInsertion = await MatriculaController.updateCurso(id, dataFinalizacao, emAndamento, aluno, curso);
                // Verifico se foi inserido
                if (mongoInsertion.nModified > 0) {
                    response = {
                        success: true,
                        message: 'Atualizado com sucesso'
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
                    message: 'Já matriculado',
                    debugInfo: e
                };
            }
        } else {
            response = {
                success: false,
                message: 'Aluno ou Curso são inválidos.'
            };
        }

        res.send(response);
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;
        const curso = await MatriculaController.deleteCurso(id);
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
    private static async newMatricula(dataMatricula: string, dataFinalizacao: string | null, emAndamento: Boolean, aluno: string, cursoID: string) {
        const MatriculaMongo = mongoose.model('matriculas', Matriculas);

        const matricula = new MatriculaMongo({
            dataMatricula: dataMatricula,
            dataFinalizacao: dataFinalizacao,
            emAndamento: emAndamento,
            aluno: aluno,
            curso: cursoID
        });

        return await MatriculaMongo.collection.insertOne(matricula);
    }

    public static async listMatricula(id?: string) {
        const MatriculasMongo = mongoose.model('matriculas', Matriculas);

        // Adiciono o id à busca
        if (id != undefined && Utils.isStrValid(id)) {
            // Se o lenght for menor que 24, não é um objectID diferente
            if (id.length != 24)
                return false;
            // Listo matriculas com o id enviado
            return await MatriculasMongo.findById(id);
        }
        // Listo todos as matriculas
        return await MatriculasMongo.find({});
    }

    public static async listMatriculaPorAluno(id: string) {
        const MatriculasMongo = mongoose.model('matriculas', Matriculas);
        return await MatriculasMongo.find({aluno: id});
    }

    private static async updateCurso(id: string, dataFinalizacao: string | null, emAndamento: Boolean, aluno: string, curso: string) {
        const MatriculaMongo = mongoose.model('matriculas', Matriculas);

        const matricula = {
            dataFinalizacao: dataFinalizacao,
            emAndamento: emAndamento,
            aluno: aluno,
            curso: curso
        };


        return await MatriculaMongo.updateOne({_id: id}, matricula);
    }

    private static async deleteCurso(id: string) {
        const MatriculaMongo = mongoose.model('matriculas', Matriculas);

        if (id.length != 24)
            return false;
        // Apago o usuario
        return await MatriculaMongo.findByIdAndDelete(id);
    }
}

const matriculaController = new MatriculaController();
export default matriculaController;
