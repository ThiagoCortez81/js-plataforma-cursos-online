import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';

@Component({
    selector: 'app-turmas',
    templateUrl: './turmas.component.html',
    styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {
    turmas: Array<any>;

    constructor(private http: HttpClient, private router: Router, private authenticator: AuthenticationService) {
    }

    ngOnInit() {
        this.listTurmaes();
    }

    listTurmaes() {
        if (this.authenticator.getUserDetails().perfil != 0) {
            this.http.get(`http://localhost:5000/list-turma?profID=${this.authenticator.getUserDetails().id}`, {}).subscribe((listTurmas: Array<any>) => {
                this.turmas = listTurmas;
            });
        } else {
            this.http.get(`http://localhost:5000/list-turma`, {}).subscribe((listTurmas: Array<any>) => {
                this.turmas = listTurmas;
            });
        }
    }

    editTurma(id) {
        this.router.navigate(['turmas/edit', id]);
    }

    adicionarTurma() {
        this.router.navigate(['turmas/add']);
    }

    excluirTurma(id) {
        if (confirm(`Deseja mesmo remover esta turma? (ID: ${id})`)) {
            const data = {
                id: id
            };

            this.http.post(`http://localhost:5000/del-turma`, data).subscribe((res: any) => {
                console.log(res.result);
                console.log(res.result == 'Ok!');
                if (res.result == 'Ok!') {
                    this.listTurmaes();
                } else {
                    window.alert('Erro ao remover turma. Tente novamente');
                }
            });
        }
    }

    matricularTurma(id) {
        this.router.navigate(['matricular/turma', id]);
    }

    verMatriculas(id) {
        this.router.navigate(['turmas/matriculas', id]);
    }

}
