import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebserviceService} from "../../services/webservice/webservice.service";

@Component({
    selector: 'app-alunos',
    templateUrl: './alunos.component.html',
    styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {
    alunos: any;

    constructor(private _ws: WebserviceService, private router: Router) {
    }

    ngOnInit() {
        this.listAlunos();
    }

    async listAlunos() {
        this.alunos = await this._ws.listarAlunos().toPromise();
    }

    async editAluno(id: string) {
        this.router.navigate(['alunos/edit', id]);
    }

    adicionarAluno() {
        this.router.navigate(['alunos/add']);
    }

    excluirAluno(id) {
        if (confirm(`Deseja mesmo remover este aluno? (ID: ${id})`)){
            const data = {
                RA: id
            };

            this._ws.deleteAluno(id).subscribe((res:any) => {
                if (res.success)
                    this.listAlunos();
                else
                    alert(res.message);
            });
        }
    }

    turmasAluno(ra) {
        this.router.navigate(['alunos/turma', ra]);
    }

    cvtData(data: string) {
        const splittedDate = data.split('-');
        if (splittedDate.length == 3)
          return splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0];
        else
          return data;
    }

}
