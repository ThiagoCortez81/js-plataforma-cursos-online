import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-alunos-turma',
  templateUrl: './alunos-turma.component.html',
  styleUrls: ['./alunos-turma.component.scss']
})
export class AlunosTurmaComponent implements OnInit {
  id;
  listMatriculas;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getMatriculas();
  }

  getMatriculas() {
    this.http.get(`http://localhost:5000/list-matriculas-aluno?id=${this.id}`, {}).subscribe((listMatriculas: any) => {
      this.listMatriculas = listMatriculas;
    });
  }

}
