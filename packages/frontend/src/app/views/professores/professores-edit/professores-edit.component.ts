import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { WebserviceService } from '../../../services/webservice/webservice.service';

@Component({
    selector: 'app-professores-edit',
    templateUrl: './professores-edit.component.html',
    styleUrls: ['./professores-edit.component.scss']
})
export class ProfessoresEditComponent implements OnInit {

    professor = {
        dataNascimento: '',
        email: '',
        nome: '',
        senha: '',
        confirmarSenha: '',
        sexo: '',
        sobrenome: '',
        _id: '',
        telefone: '',
        endereco: '',
        formacoes: ''
    };
    isNew = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _ws: WebserviceService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id == null) {
            this.isNew = true;
        } else {
            this.getProfessor(id);
        }
    }

    async getProfessor(id) {
        const professorObj: any = await this._ws.listarProfessores(id).toPromise();
        console.log(professorObj);
        delete professorObj.professor.senha;
        this.professor = professorObj.professor;
    }

    salvarProfessor() {
        if (this.isNew) {
            this._ws.insertProfessor(this.professor).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['professores']);
                else
                    alert(res.message);
            })
        } else {
            this._ws.updateProfessor(this.professor).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['professores']);
                else
                    alert(res.message);
            })
        }
    }

}
