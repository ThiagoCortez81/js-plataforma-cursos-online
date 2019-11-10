import {Request, Response} from "express";
import {Alunos, Matriculas, Usuarios} from "../models/mongo";
import * as mongoose from "mongoose";
import {Utils} from "../routes/utils";
import {Schema} from "mongoose";
import cursoController from "./cursoController";

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

    // Interação com Mongo
    private static async getMapAlunoCurso(): Promise<any[]> {
        const UsuariosMongo = mongoose.model('matriculas', Matriculas);

        // Listo todos os cursos
        return await UsuariosMongo.aggregate([{$group: {_id: "$curso", count: {$sum: 1}}}]);
    }
}

const relatorioController = new RelatorioController();
export default relatorioController;
