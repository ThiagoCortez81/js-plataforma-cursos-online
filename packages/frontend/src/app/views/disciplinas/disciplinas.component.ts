import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';

@Component({
    selector: 'app-disciplinas',
    templateUrl: './disciplinas.component.html',
    styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent implements OnInit {
    disciplinas: Array<any>;
    idProfessor = null;

    constructor(private http: HttpClient, private router: Router, private authenticator: AuthenticationService) {
    }

    ngOnInit() {
        if (this.authenticator.getUserDetails().perfil == 1) {
            this.idProfessor = this.authenticator.getUserDetails().id;
        }
        this.listDisciplinas();
    }

    listDisciplinas() {
        if (this.idProfessor != null) {
            this.http.get(`http://localhost:5000/list-disciplina?id=${this.idProfessor}`, {}).subscribe((listDisciplinas: Array<any>) => {
                this.disciplinas = listDisciplinas;
            });
        } else {
            this.http.get('http://localhost:5000/list-disciplina', {}).subscribe((listDisciplinas: Array<any>) => {
                this.disciplinas = listDisciplinas;
            });
        }
    }

    editDisciplina(id) {
        this.router.navigate(['disciplinas/edit', id]);
    }

    adicionarDisciplina() {
        this.router.navigate(['disciplinas/add']);
    }

    excluirDisciplina(id) {
        if (confirm(`Deseja mesmo remover esta disciplina? (ID: ${id})`)) {
            const data = {
                id: id
            };

            this.http.post(`http://localhost:5000/del-disciplina`, data).subscribe((res: any) => {
                console.log(res.result);
                console.log(res.result == 'Ok!');
                if (res.result == 'Ok!') {
                    this.listDisciplinas();
                } else {
                    window.alert('Erro ao remover disciplina. Tente novamente');
                }
            });
        }
    }

    questoesDisciplina(id) {
        this.router.navigate(['questoes/disciplina/', id]);
    }

}
