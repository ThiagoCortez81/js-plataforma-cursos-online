import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-responder-prova',
  templateUrl: './responder-prova.component.html',
  styleUrls: ['./responder-prova.component.scss']
})
export class ResponderProvaComponent implements OnInit {
  idAluno;
  idAval;
  idTurma;
  questoes;
  private listRespostas = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private authenticator:AuthenticationService) {
  }

  ngOnInit() {
    this.idAluno = this.authenticator.getUserDetails().id;
    this.idAval = this.route.snapshot.paramMap.get('idAval');
    this.idTurma = this.route.snapshot.paramMap.get('idTurma');
    this.listQuestoes();
  }

  listQuestoes() {
    this.http.get(`http://localhost:5000/listar-questao?idAval=${this.idAval}`).subscribe((listQuestoes: Array<any>) => {
      this.questoes = listQuestoes;
    });
  }

  setSelecao(index, resposta, idQuestao){
    this.listRespostas[index] = {
      resposta: resposta,
      idQuestao: idQuestao
    };
  }

  enviarRespostas() {
    if (this.listRespostas.length === this.questoes.length) {
      let data = {
        listRespostas: this.listRespostas,
        idAval: this.idAval,
        idAluno: this.idAluno
      };
      this.http.post(`http://localhost:5000/responder-avaliacao`, data).subscribe((res: any) => {
        if (res.result == 'Ok!') {
          alert('Salvo com sucesso!');
          this.router.navigate(['minhas-turmas', this.idTurma])
        } else {
          alert('Erro ao salvar avaliacao. Tente novamente');
        }
      });
    } else {
      alert("Responda todas as perguntas para continuar.");
    }
  }

}
