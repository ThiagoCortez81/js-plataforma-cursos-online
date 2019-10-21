import {Application, Router} from 'express';
import userController from "../controller/alunoController";
import {server} from "../system.start";
import alunoController from "../controller/alunoController";
import professorController from "../controller/professorController";

class ApiRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', (req, res) => {
            res.send({"message": "It works!"})
        });

        this.mountAlunoRoutes();
        this.mountProfessorRoutes();

        // this.router.post('/login', userController.loginUsuario);
    }

    private mountAlunoRoutes() {
        this.router.get('/aluno/list', alunoController.list);
        this.router.get('/aluno/list/:id', alunoController.listById);
        this.router.post('/aluno/insert', alunoController.insert);
        this.router.put('/aluno/update', alunoController.update);
        this.router.delete('/aluno/delete/:id', alunoController.delete);
    }

    private mountProfessorRoutes() {
        this.router.get('/professor/list', professorController.list);
        this.router.get('/professor/list/:id', professorController.listById);
        this.router.post('/professor/insert', professorController.insert);
        this.router.put('/professor/update', professorController.update);
        this.router.delete('/professor/delete/:id', professorController.delete);
    }
}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
