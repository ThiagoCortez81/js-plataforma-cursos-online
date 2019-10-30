import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-disciplinas-edit',
    templateUrl: './disciplinas-edit.component.html',
    styleUrls: ['./disciplinas-edit.component.scss']
})
export class DisciplinasEditComponent implements OnInit {
    disciplina = {
        DiscID: '',
        Nome: ''
    };
    isNew = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id == 0) {
            this.isNew = true;
        } else {
            this.getDisciplina(id);
        }
    }

    getDisciplina(id) {
        this.http.get(`http://localhost:5000/buscar-disciplina?id=${id}`, {}).subscribe((disciplina: any) => {
            this.disciplina = disciplina;
        });
    }

    salvarDisciplina() {
        const data = {
            id: this.disciplina.DiscID,
            name: this.disciplina.Nome
        };

        if (!this.isNew) {
            this.http.post(`http://localhost:5000/edit-disciplina`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['disciplinas']);
                } else {
                    alert('Erro ao alterar disciplina. Tente novamente');
                }
            });
        } else {
            this.http.post(`http://localhost:5000/add-disciplina`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['disciplinas']);
                } else {
                    alert('Erro ao alterar disciplina. Tente novamente');
                }
            });
        }
    }

}
