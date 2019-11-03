import {Router} from 'express';
import alunoController from "../controller/alunoController";
import professorController from "../controller/professorController";
import usuarioController from "../controller/usuarioController";
import cursoController from "../controller/cursoController";

class ApiRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', (req, res) => {
            res.send({"message": "It works!"})
        });

        this.mountUsuarioRoutes();
        this.mountAlunoRoutes();
        this.mountProfessorRoutes();
        this.mountCursosRoutes();

        // this.router.post('/login', userController.loginUsuario);
    }

    private mountUsuarioRoutes() {
        this.router.get('/usuario/list', usuarioController.list);
        this.router.get('/usuario/list/:id', usuarioController.listById);
        this.router.post('/usuario/insert', usuarioController.insert);
        this.router.put('/usuario/update', usuarioController.update);
        this.router.delete('/usuario/delete/:id', usuarioController.delete);
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

    private mountCursosRoutes() {
        this.router.get('/curso/list', cursoController.list);
        this.router.get('/curso/list/:id', cursoController.listById);
        this.router.post('/curso/insert', cursoController.insert);
        this.router.put('/curso/update', cursoController.update);
        this.router.delete('/curso/delete/:id', cursoController.delete);
    }
}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
