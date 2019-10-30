import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {WebserviceService} from "../../../services/webservice/webservice.service";

@Component({
    selector: 'app-alunos-edit',
    templateUrl: './alunos-edit.component.html',
    styleUrls: ['./alunos-edit.component.scss']
})
export class AlunosEditComponent implements OnInit {
    private aluno = {
        dataNascimento: '',
        email: '',
        nome: '',
        senha: '',
        sexo: '',
        sobrenome: '',
        _id: ''
    };
    private isNew = false;

    constructor(private route: ActivatedRoute, private router: Router, private _ws: WebserviceService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        if (id == undefined) {
            this.isNew = true;
        } else {
            this.getAluno(id);
        }
    }

    async getAluno(id) {
        const alunoObj: any = await this._ws.listarAlunos(id).toPromise()
        this.aluno = alunoObj.aluno;
    }

    salvarAluno() {
       /* const data = {
            RA: this.aluno.RA,
            name: this.aluno.Nome,
            login: this.aluno.Login,
            senha: this.aluno.Senha
        };*/

/*        if (!this.isNew) {
            this.http.post(`http://localhost:5000/edit-aluno`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['alunos']);
                } else {
                    alert('Erro ao alterar aluno. Tente novamente');
                }
            });
        } else {
            this.http.post(`http://localhost:5000/add-aluno`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['alunos']);
                } else {
                    alert('Erro ao alterar aluno. Tente novamente');
                }
            });
        } */
    }

}
