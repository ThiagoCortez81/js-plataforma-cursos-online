import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-turmas-edit',
    templateUrl: './turmas-edit.component.html',
    styleUrls: ['./turmas-edit.component.scss']
})
export class TurmasEditComponent implements OnInit {
    private turma = {
        TurmaID: '',
        profID: '',
        DiscID: '',
        listProfessores: [],
        listDisciplinas: []
    };
    private isNew = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id == 0) {
            this.isNew = true;
        }
        this.getTurma(id);
    }

    getTurma(id) {
        this.http.get(`http://localhost:5000/buscar-turma?id=${id}`, {}).subscribe((turma: any) => {
            this.turma = turma;
        });
    }

    salvarTurma() {
        const data = {
            id: this.turma.TurmaID,
            discId: this.turma.DiscID,
            profId: this.turma.profID
        };

        if (!this.isNew) {
            this.http.post(`http://localhost:5000/edit-turma`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['turmas']);
                } else {
                    alert('Erro ao alterar turma. Tente novamente');
                }
            });
        } else {
            this.http.post(`http://localhost:5000/add-turma`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['turmas']);
                } else {
                    alert("Erro ao alterar turma. Tente novamente");
                }
            });
        }
    }

}
