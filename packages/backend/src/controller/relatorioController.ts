import {Request, Response} from "express";
import {Alunos, Cursos, Matriculas, Usuarios} from "../models/mongo";
import * as mongoose from "mongoose";
import {Utils} from "../routes/utils";
import {Schema} from "mongoose";
import cursoController from "./cursoController";
import matriculaController, {MatriculaController} from "./matriculaController";
import professorController from "./professorController";
import alunoController, {AlunoController} from "./alunoController";

const SECRET = process.env.SECRET || "sleocgrient";

class RelatorioController {
    // HTTP Handlers
    public async relatorioAlunoCurso(req: Request, res: Response) {
        const listAlunoCurso: any[] = await RelatorioController.getMapAlunoCurso();
        if (listAlunoCurso) {
            for (let curso of listAlunoCurso) {
                curso['dadosCurso'] = await cursoController.listByIdInternal(curso._id);
            }

            res.send({
                success: true,
                listAlunoCurso: listAlunoCurso
            });
            return;
        }
        res.send({
            success: false,
            listAlunoCurso: []
        });
    }

    public async relatorioCursosProfessor(req: Request, res: Response) {
        res.send({
            success: true,
            listCursosProfessor: await RelatorioController.getMapProfessorCurso()
        });
    }

    public async relatorioAlunoCursoConcluintes(req: Request, res: Response) {
        const dataMin = req.body.dataMin;
        const dataMax = req.body.dataMax;

        const listAlunoCurso: any[] = await RelatorioController.getMapAlunoCursoConcluintes(dataMin, dataMax);
        if (listAlunoCurso) {
            let listAlunoCursoFinal = [];

            for (let curso of listAlunoCurso) {
                const cursoDados = await cursoController.listByIdInternal(curso.curso);
                const alunoDados = await AlunoController.listAlunos(curso.aluno);
                const cursoObj = {
                    curso,
                    cursoDados,
                    alunoDados
                };

                listAlunoCursoFinal.push(cursoObj);
            }

            res.send({
                success: true,
                listAlunoCurso: listAlunoCursoFinal
            });
            return;
        }
        res.send({
            success: false,
            listAlunoCurso: []
        });
    }

    // Interação com Mongo
    private static async getMapAlunoCurso(): Promise<any[]> {
        const UsuariosMongo = mongoose.model('matriculas', Matriculas);

        // Listo todos os cursos
        return await UsuariosMongo.aggregate([{$group: {_id: "$curso", count: {$sum: 1}}}]);
    }

    private static async getMapAlunoCursoConcluintes(dataMin: string, dataMax: string): Promise<any[]> {
        const UsuariosMongo = mongoose.model('matriculas', Matriculas);

        // Listo todos os cursos
        if (Utils.isStrValid(dataMin) && Utils.isStrValid(dataMax))
            return await UsuariosMongo.find({
                $and: [{
                    "dataFinalizacao": {$gte: dataMin}
                }, {
                    "dataFinalizacao": {$lte: dataMax}
                }, {
                    "emAndamento": false
                }]
            });

        return await UsuariosMongo.find({
            "emAndamento": false
        });
    }

    private static async getMapProfessorCurso(): Promise<any[]> {
        const CursosMongo = mongoose.model('cursos', Cursos);

        let cursosPorProfessor = await CursosMongo.aggregate([{$group: {_id: "$idProfessor", count: {$sum: 1}}}]);
        for (let cursoProfessor of cursosPorProfessor) {
            cursoProfessor['professorObj'] = await professorController.listProfessores(cursoProfessor._id);
        }

        return cursosPorProfessor;
    }
}

const relatorioController = new RelatorioController();
export default relatorioController;
