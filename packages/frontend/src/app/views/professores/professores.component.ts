import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {WebserviceService} from "../../services/webservice/webservice.service";

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {
  private professores: any;

  constructor(private http: HttpClient, private router: Router, private _ws: WebserviceService) {
  }

  ngOnInit() {
    this.listProfessores();
  }

  async listProfessores() {
    this.professores = await this._ws.listarProfessores().toPromise();
  }

  editProfessor(id) {
    this.router.navigate(['professores/edit', id]);
  }

  adicionarProfessor() {
    this.router.navigate(['professores/add']);
  }

  excluirProfessor(id) {
    if (confirm(`Deseja mesmo remover este professor? (ID: ${id})`)){
      const data = {
        id: id
      };

      this.http.post(`http://localhost:5000/del-professor`, data).subscribe((res: any) => {
        console.log(res.result);
        console.log(res.result == 'Ok!');
        if (res.result == 'Ok!'){
          this.listProfessores();
        } else {
          window.alert("Erro ao remover professor. Tente novamente");
        }
      });
    }
  }

  turmasProfessor(id) {
    this.router.navigate(['professores/turma', id]);
  }

}
