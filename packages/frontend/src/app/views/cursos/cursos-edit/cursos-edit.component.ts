import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WebserviceService} from "../../../services/webservice/webservice.service";

@Component({
    selector: 'app-cursos-edit',
    templateUrl: './cursos-edit.component.html',
    styleUrls: ['./cursos-edit.component.scss']
})
export class CursosEditComponent implements OnInit {
    curso = {
        _id: '',
        nome: '',
        tema: '',
        descricao: '',
        valor: '',
        duracao: '',
        urlVideoaula: '',
        idProfessor: ''
    };
    professores: any;
    isNew = false;

    constructor(private route: ActivatedRoute, private router: Router, private _ws: WebserviceService) {
    }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        await this.getProfessores();

        if (id == undefined) {
            this.isNew = true;
        } else {
            this.getCurso(id);
        }
    }

    async getCurso(id) {
        const cursoObj: any = await this._ws.listarCursos(id).toPromise();
        this.curso = cursoObj.curso;
    }

    async getProfessores() {
        this.professores = await this._ws.listarProfessores().toPromise();
    }

    salvarCurso() {
        if (this.isNew) {
            this._ws.insertCursos(this.curso).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['cursos']);
                else
                    alert(res.message);
            })
        } else {
            this._ws.updateCursos(this.curso).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['cursos']);
                else
                    alert(res.message);
            })
        }
    }

}
