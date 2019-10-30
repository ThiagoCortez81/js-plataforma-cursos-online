import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

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
        console.log('realizarLogin');
        window.location.href = '/#/dashboard';
        window.location.reload();
    }
}
