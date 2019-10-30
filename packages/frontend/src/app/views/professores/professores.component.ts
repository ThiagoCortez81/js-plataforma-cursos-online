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
  professores: any;

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

      this._ws.deleteProfessor(id).subscribe((res:any) => {
        if (res.success)
            this.listProfessores();
        else
            alert(res.message);
    });
    }
  }

  turmasProfessor(id) {
    this.router.navigate(['professores/turma', id]);
  }

  cvtData(data: string) {
    const splittedDate = data.split('-');
    if (splittedDate.length == 3)
      return splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0];
    else
      return data;
  }

}
