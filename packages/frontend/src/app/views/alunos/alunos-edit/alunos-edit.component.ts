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
    aluno = {
        dataNascimento: '',
        email: '',
        nome: '',
        senha: '',
        confirmarSenha: '',
        sexo: '',
        sobrenome: '',
        _id: ''
    };
    isNew = false;

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
        const alunoObj: any = await this._ws.listarAlunos(id).toPromise();
        delete alunoObj.aluno.senha;
        this.aluno = alunoObj.aluno;
    }

    salvarAluno() {
        if (this.isNew) {
            this._ws.insertAluno(this.aluno).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['alunos']);
                else
                    alert(res.message);
            })
        } else {
            this._ws.updateAluno(this.aluno).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['alunos']);
                else
                    alert(res.message);
            })
        }
    }

}
