import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebserviceService} from "../../services/webservice/webservice.service";

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
    usuarios: any;

    constructor(private _ws: WebserviceService, private router: Router) {
    }

    ngOnInit() {
        this.listUsuarios();
    }

    async listUsuarios() {
        this.usuarios = await this._ws.listarUsuarios().toPromise();
    }

    async editUsuario(id: string) {
        this.router.navigate(['usuario/edit', id]);
    }

    adicionarUsuario() {
        this.router.navigate(['usuario/add']);
    }

    excluirUsuario(id) {
        if (confirm(`Deseja mesmo remover este usuario? (ID: ${id})`)){
            const data = {
                RA: id
            };

            this._ws.deleteUsuario(id).subscribe((res:any) => {
                if (res.success)
                    this.listUsuarios();
                else
                    alert(res.message);
            });
        }
    }

    turmasUsuario(ra) {
        this.router.navigate(['usuario/turma', ra]);
    }

    cvtData(data: string) {
        const splittedDate = data.split('-');
        if (splittedDate.length == 3)
          return splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0];
        else
          return data;
    }

}
