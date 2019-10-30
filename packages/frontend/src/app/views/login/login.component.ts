import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    private isAdmin = false;
    private isProfessor = false;
    private isAluno = false;
    private login;
    private senha;

    constructor(private http: HttpClient, private router: Router, private authenticator: AuthenticationService) {
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

    realizarLogin() {
        const data = {
            login: this.login,
            senha: this.senha
        };

        if (this.isAdmin) {
            this.authenticator.setPerfil("0");
            this.http.post(`http://localhost:5000/login-funcAdm`, data).subscribe((res: any) => {
                if (res.result == 'null') {
                    this.senha = '';
                    alert("Usuário/Senha incoretos.")
                } else {
                    this.authenticator.saveToken(res.authReq);
                    window.location.href = '/#/dashboard';
                    window.location.reload();
                }
            });
        } else if (this.isProfessor) {
            this.authenticator.setPerfil("1");
            this.http.post(`http://localhost:5000/login-professor`, data).subscribe((res: any) => {
                if (res.result == 'null') {
                    this.senha = '';
                    alert("Usuário/Senha incoretos.")
                } else {
                    this.authenticator.saveToken(res.authReq);
                    window.location.href = '/#/dashboard';
                    window.location.reload();
                }
            });
        } else if (this.isAluno) {
            this.authenticator.setPerfil("2");
            this.http.post(`http://localhost:5000/login-Aluno`, data).subscribe((res: any) => {
                if (res.result == 'null') {
                    this.senha = '';
                    alert("Usuário/Senha incoretos.")
                } else {
                    this.authenticator.saveToken(res.authReq);
                    window.location.href = '/#/dashboard';
                    window.location.reload();
                }
            });
        }
    }
}
