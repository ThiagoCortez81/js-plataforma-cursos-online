import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

// Interfaces here

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private token: string;
    private perfil: string;

    constructor(private http?: HttpClient, private router?: Router) {
    }

    public saveToken(token: string): void {
        localStorage.setItem('login-token', token);
        this.token = token;
    }

    public getUserDetails() {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user != null && user.perfil == this.getPerfil()) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('login-token');
        }
        return this.token;
    }

    public setPerfil(perfil: string): string {
        this.perfil = perfil;
        localStorage.setItem('login-perfil', perfil);
        return this.perfil;
    }

    public getPerfil(): string {
        if (!this.perfil) {
            this.perfil = localStorage.getItem('login-perfil');
        }
        return this.perfil;
    }
}
