import {Application, Router} from 'express';
import userController from "../controller/alunoController";
import {server} from "../system.start";
import alunoController from "../controller/alunoController";

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

        // this.router.post('/login', userController.loginUsuario);
    }

    private mountAlunoRoutes() {
        this.router.get('/aluno/list', alunoController.list);
        this.router.get('/aluno/list/:id', alunoController.listById);
        this.router.post('/aluno/insert', alunoController.insert);
        this.router.put('/aluno/update', alunoController.update);
        this.router.delete('/aluno/delete/:id', alunoController.delete);
    }
}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
