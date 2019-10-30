import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {
  avaliacoes: Array<any>;
  id;

  constructor(private http: HttpClient, private router: Router, private authenticator: AuthenticationService) {
  }

  ngOnInit() {
    this.id = this.authenticator.getUserDetails().id;
    this.listAvaliacoes();
  }

  listAvaliacoes() {
    this.http.get(`http://localhost:5000/list-avaliacao?id=${this.id}`, {}).subscribe((listAvaliacoes: Array<any>) => {
      this.avaliacoes = listAvaliacoes;
    });
  }

  addQuestao(id) {
    this.router.navigate(['avaliacao/questoes/', JSON.stringify(id)]);
  }

  adicionarAvaliacao() {
    this.router.navigate(['avaliacao/add']);
  }

  excluirAvaliacao(id) {
    if (confirm(`Deseja mesmo remover este avaliacao? (ID: ${id})`)){
      const data = {
        id: id
      };

      this.http.post(`http://localhost:5000/del-avaliacao`, data).subscribe((res: any) => {
        console.log(res.result);
        console.log(res.result == 'Ok!');
        if (res.result == 'Ok!'){
          this.listAvaliacoes();
        } else {
          alert("Erro ao remover avaliacao. Tente novamente");
        }
      });
    }
  }

  turmasAvaliacao(id) {
    this.router.navigate(['avaliacoes/turma', id]);
  }

}
