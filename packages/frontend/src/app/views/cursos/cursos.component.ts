import { Component, OnInit } from '@angular/core';
import {WebserviceService} from "../../services/webservice/webservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  cursos: any;

  constructor(private _ws: WebserviceService, private router: Router) {
  }

  ngOnInit() {
    this.listCursos();
  }

  async listCursos() {
    this.cursos = await this._ws.listarCursos().toPromise();
  }

  async editCurso(id: string) {
    this.router.navigate(['cursos/edit', id]);
  }

  adicionarAluno() {
    this.router.navigate(['cursos/add']);
  }

  excluirCurso(id) {
    if (confirm(`Deseja mesmo remover este aluno? (ID: ${id})`)){
      const data = {
        RA: id
      };

      this._ws.deleteCursos(id).subscribe((res:any) => {
        if (res.success)
          this.listCursos();
        else
          alert(res.message);
      });
    }
  }

  toReais(valor: string) {
    return 'R$ ' + valor.replace('.', ',');
  }

}
