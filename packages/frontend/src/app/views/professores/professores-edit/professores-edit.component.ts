import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-professores-edit',
    templateUrl: './professores-edit.component.html',
    styleUrls: ['./professores-edit.component.scss']
})
export class ProfessoresEditComponent implements OnInit {

    private professor = {
        dataNascimento: '',
        email: '',
        nome: '',
        senha: '',
        confirmarSenha: '',
        sexo: '',
        sobrenome: '',
        _id: '',
        telefone: '',
        endereco: '',
        formacoes: ''
    };
    private isNew = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id == 0) {
            this.isNew = true;
        } else {
            this.getProfessor(id);
        }
    }

    getProfessor(id) {
        this.http.get(`http://localhost:5000/buscar-professor?id=${id}`, {}).subscribe((professor: any) => {
            this.professor = professor;
        });
    }

    salvarProfessor() {
        /*

        if (!this.isNew) {
            this.http.post(`http://localhost:5000/edit-professor`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['professores']);
                } else {
                    alert('Erro ao alterar professor. Tente novamente');
                }
            });
        } else {
            this.http.post(`http://localhost:5000/add-professor`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['professores']);
                } else {
                    alert('Erro ao alterar professor. Tente novamente');
                }
            });
        }*/
    }

}
