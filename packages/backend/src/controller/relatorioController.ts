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
                curso.dataMatricula = curso.dataMatricula.toString().substr(0, 19) + "Z";
                curso.dataFinalizacao = curso.dataFinalizacao.toString().substr(0, 19) + "Z";

                const diferenca = new Date(curso.dataFinalizacao).getTime() - new Date(curso.dataMatricula).getTime();
                let diferencaTempo = '';

                if (diferenca > 60e3)
                    diferencaTempo = `${Math.floor(diferenca / 60e3)} minutos`;
                else
                    diferencaTempo = `${Math.floor(diferenca / 1e3)} segundos`

                const cursoDados = await cursoController.listByIdInternal(curso.curso);
                const alunoDados = await AlunoController.listAlunos(curso.aluno);
                const professorDados = await professorController.listProfessores(cursoDados.idProfessor);
                const cursoObj = {
                    curso,
                    cursoDados,
                    alunoDados,
                    professorDados,
                    diferencaTempo
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

    public async relatorioVendasMensais(req: Request, res: Response) {
        const listVendasCurso: any = await MatriculaController.listMatricula();
        if (listVendasCurso) {
            let listVendasCursoFinal: any = [];
            let listVendasCursoItr: any = {};

            for (let venda of listVendasCurso) {
                venda.dataMatricula = venda.dataMatricula.toString().substr(0, 19) + "Z";
                const cursoObj = await cursoController.listByIdInternal(venda.curso);

                const objDataMatricula = new Date(venda.dataMatricula);
                const mes = Utils.returnMonthString(objDataMatricula.getMonth());

                if (listVendasCursoItr[mes] == null)
                    listVendasCursoItr[mes] = 0;
                listVendasCursoItr[mes] += cursoObj.valor;
            }

            for (const mes of Object.keys(listVendasCursoItr)){
                listVendasCursoFinal.push({
                    mes: mes,
                    sequencial: Utils.returnMonthIndex(mes),
                    vendas: listVendasCursoItr[mes].toFixed(2)
                })
            }

            res.send({
                success: true,
                listVendasCurso: listVendasCursoFinal
            });
            return;
        }
        res.send({
            success: false,
            listVendasCurso: []
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
