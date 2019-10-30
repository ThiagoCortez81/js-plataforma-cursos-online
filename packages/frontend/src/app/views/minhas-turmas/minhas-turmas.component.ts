import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-minhas-turmas',
  templateUrl: './minhas-turmas.component.html',
  styleUrls: ['./minhas-turmas.component.scss']
})
export class MinhasTurmasComponent implements OnInit {
  private id;
  private listMatriculas;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private authenticator:AuthenticationService) { }

  ngOnInit() {
    this.id = this.authenticator.getUserDetails().id;
    this.getMatriculas();
  }

  getMatriculas() {
    this.http.get(`http://localhost:5000/list-matriculas-aluno?id=${this.id}`, {}).subscribe((listMatriculas: any) => {
      this.listMatriculas = listMatriculas;
    });
  }

  visualizarTurma(turma) {
    this.router.navigate(['minhas-turmas', turma])
  }

}
