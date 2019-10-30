import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../authentication.service';

@Component({
  selector: 'app-avaliacoes-nova',
  templateUrl: './avaliacoes-nova.component.html',
  styleUrls: ['./avaliacoes-nova.component.scss']
})
export class AvaliacoesNovaComponent implements OnInit {
  private listTurmas;
  private turmaSel;
  constructor(private http: HttpClient, private router: Router, private authenticator: AuthenticationService) { }

  ngOnInit() {
    this.listarTurmas();
  }

  listarTurmas() {
    this.http.get(`http://localhost:5000/list-turma?profID=${this.authenticator.getUserDetails().id}`, {}).subscribe((listTurmas: Array<any>) => {
      this.listTurmas = listTurmas;
    });
  }

  salvarMatricula() {
    const data = {
      turma: this.turmaSel
    };

    this.http.post('http://localhost:5000/add-avaliacao', data).subscribe((res: any) => {
      if (res.result == 'Ok!'){
        this.router.navigate(['avaliacao']);
      } else {
        alert("Erro ao criar avaliacao. Tente novamente");
      }
    });
  }

}
