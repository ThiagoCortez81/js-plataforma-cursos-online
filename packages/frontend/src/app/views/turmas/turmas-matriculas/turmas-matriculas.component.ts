import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-turmas-matriculas',
    templateUrl: './turmas-matriculas.component.html',
    styleUrls: ['./turmas-matriculas.component.scss']
})
export class TurmasMatriculasComponent implements OnInit {
    id;
    listMatriculas;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.listarMatriculas();
    }

    listarMatriculas() {
        this.http.get(`http://localhost:5000/list-matriculas-turma?id=${this.id}`, {}).subscribe((listMatriculas: any) => {
            this.listMatriculas = listMatriculas;
        });
    }

    verNotas(matriculaID, alunoRA) {
        this.router.navigate(['turmas/matriculas/ver-notas', matriculaID, alunoRA]);
    }

}
