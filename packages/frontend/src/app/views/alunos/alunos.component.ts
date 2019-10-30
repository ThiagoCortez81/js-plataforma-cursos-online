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

    async editAluno(id: string) {;
        this.router.navigate(['alunos/edit', id]);
    }

    adicionarAluno() {
        this.router.navigate(['alunos/add']);
    }

    excluirAluno(ra) {
        if (confirm(`Deseja mesmo remover este aluno? (RA: ${ra})`)){
            const data = {
                RA: ra
            };

            /*this.http.post(`http://localhost:5000/del-aluno`, data).subscribe((res: any) => {
                console.log(res.result);
                console.log(res.result == 'Ok!');
                if (res.result == 'Ok!'){
                    this.listAlunos();
                } else {
                    alert("Erro ao remover aluno. Tente novamente");
                }
            });*/
        }
    }

    turmasAluno(ra) {
        this.router.navigate(['alunos/turma', ra]);
    }

}
