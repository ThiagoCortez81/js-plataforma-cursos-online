import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../authentication.service';

@Component({
    selector: 'app-minhas-turmas-disciplina',
    templateUrl: './minhas-turmas-disciplina.component.html',
    styleUrls: ['./minhas-turmas-disciplina.component.scss']
})
export class MinhasTurmasDisciplinaComponent implements OnInit {
    id;
    idAluno;
    idTurma;
    listProvas;
    mediaNota = 0;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private authenticator: AuthenticationService) {
    }

    ngOnInit() {
        this.idAluno = this.route.snapshot.paramMap.get('idAluno');
        if (this.idAluno) {
            this.id = this.idAluno;
        } else {
            this.id = this.authenticator.getUserDetails().id;
        }
        this.idTurma = this.route.snapshot.paramMap.get('id');
        this.getProvas();
    }

    getProvas() {
        this.http.get(`http://localhost:5000/list-provas-turma?id=${this.idTurma}&idAluno=${this.id}`, {}).subscribe((listProvas: any) => {
            for (let prova of listProvas) {
                prova['nota'] = ((prova.qtdAcertos / prova.qtdPerguntas) * 10).toFixed(2);
                this.mediaNota += parseFloat(prova['nota']);
            }
            this.listProvas = listProvas;
            this.mediaNota /= this.listProvas.length;
            console.log(this.listProvas);
        });
    }

    responderProva(idAval) {
        this.router.navigate(['responder-prova', idAval, this.idTurma]);
    }

}
