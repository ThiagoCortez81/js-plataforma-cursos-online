import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {WebserviceService} from "../../../services/webservice/webservice.service";

@Component({
    selector: 'app-usuarios-edit',
    templateUrl: './usuarios-edit.component.html',
    styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {
    usuario = {
        dataNascimento: '',
        email: '',
        nome: '',
        senha: '',
        confirmarSenha: '',
        sexo: '',
        sobrenome: '',
        _id: ''
    };
    isNew = false;

    constructor(private route: ActivatedRoute, private router: Router, private _ws: WebserviceService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        if (id == undefined) {
            this.isNew = true;
        } else {
            this.getUsuario(id);
        }
    }

    async getUsuario(id) {
        const usuarioObj: any = await this._ws.listarUsuarios(id).toPromise();
        delete usuarioObj.usuario.senha;
        this.usuario = usuarioObj.usuario;
    }

    salvarUsuario() {
        if (this.isNew) {
            this._ws.insertUsuario(this.usuario).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['usuario']);
                else
                    alert(res.message);
            })
        } else {
            this._ws.updateUsuario(this.usuario).subscribe((res: any) => {
                if (res.success)
                    this.router.navigate(['usuario']);
                else
                    alert(res.message);
            })
        }
    }

}
