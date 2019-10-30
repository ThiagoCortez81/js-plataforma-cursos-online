import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-professores-turma',
  templateUrl: './professores-turma.component.html',
  styleUrls: ['./professores-turma.component.scss']
})
export class ProfessoresTurmaComponent implements OnInit {
  private id;
  private listTurmas;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getTurmas();
  }

  getTurmas() {
    this.http.get(`http://localhost:5000/list-turmas-professor?id=${this.id}`, {}).subscribe((listTurmas: any) => {
      this.listTurmas = listTurmas;
    });
  }

}
