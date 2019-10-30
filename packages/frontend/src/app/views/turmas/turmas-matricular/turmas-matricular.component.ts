import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-turmas-matricular',
    templateUrl: './turmas-matricular.component.html',
    styleUrls: ['./turmas-matricular.component.scss']
})
export class TurmasMatricularComponent implements OnInit {
    id;
    listAlunos;
    alunoRA;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.alunoRA = "";
    }

    ngOnInit() {
        this.getListAlunos();
    }

    getListAlunos(){
        this.http.get(`http://localhost:5000/list-aluno`, {}).subscribe((listAlunos: any) => {
            this.listAlunos = listAlunos;
        });
    }

    salvarMatricula() {
        const data = {
            turmaID: this.id,
            alunoRA: this.alunoRA
        };

        this.http.post(`http://localhost:5000/add-matricula`, data).subscribe((res: any) => {
            if (res.result == 'Ok!'){
                this.router.navigate(['turmas']);
            } else {
                alert("Erro ao matricular. Tente novamente");
            }
        });
    }
}
