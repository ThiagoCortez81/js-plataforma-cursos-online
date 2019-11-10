import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {WebserviceService} from "../../services/webservice/webservice.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    isAdmin = false;
    isProfessor = false;
    isAluno = false;
    login;
    senha;

    constructor(private _ws: WebserviceService, private router: Router, private authenticator: AuthenticationService) {
        localStorage.setItem('aluno', null);
    }

    setTipoLogin(isAdmin, isProfessor, isAluno) {
        this.isAdmin = false;
        this.isProfessor = false;
        this.isAluno = false;

        if (isAdmin) {
            this.isAdmin = isAdmin;
        }
        if (isProfessor) {
            this.isProfessor = isProfessor;
        }
        if (isAluno) {
            this.isAluno = isAluno;
        }
    }

    async realizarLogin() {
        if (this.isAluno) {
            const loginDataResponse = await this._ws.loginAluno({login: this.login, senha: this.senha}).toPromise();
            const loginData = loginDataResponse[0];
            if (loginData != null) {
                localStorage.setItem('aluno', JSON.stringify(loginData));
            } else {
                alert('Combinação email/senha não conferem.')
            }
        }

        console.log('realizarLogin');
        window.location.href = '/#/dashboard';
        window.location.reload();
    }
}
