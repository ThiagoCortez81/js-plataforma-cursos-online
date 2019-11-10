import {Component, OnInit} from '@angular/core';
import {WebserviceService} from "../../services/webservice/webservice.service";
import {YoutubeService} from "../../services/youtube/youtube.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-matriculas',
    templateUrl: './matriculas.component.html',
    styleUrls: ['./matriculas.component.scss']
})
export class MatriculasComponent implements OnInit {
    matriculasFull: any;
    matriculas: any;
    cursos: any;
    minhaMatricula: string;

    constructor(private _ws: WebserviceService, private _ys: YoutubeService, private router: Router) {
    }

    ngOnInit() {
        this.setUser();
        this.listCursos();
    }

    setUser() {
        const aluno = JSON.parse(localStorage.getItem('aluno'));
        console.log(aluno)
        this.minhaMatricula = aluno._id;
    }

    async listCursos() {
        const matriculas: any = await this._ws.listarMatriculasPorAluno(this.minhaMatricula).toPromise();
        this.matriculasFull = matriculas.listMatriculas;
        this.matriculas = matriculas.listMatriculas.map((matricula) => {
            return matricula.matricula.curso;
        });

        this.cursos = await this._ws.listarCursos().toPromise();
        for (let curso of this.cursos) {
            curso['matriculado'] = null;
            for (let matricula of this.matriculasFull) {
                if (matricula.curso._id == curso.curso._id)
                    curso['matriculado'] = matricula.matricula._id;
            }
            // if (this.matriculas.includes(curso.curso._id))
            //     curso['matriculado'] = true;

            const dadosVideo: any = await this._ys.recuperarDadosVideo(curso.curso.urlVideoaula).toPromise();
            curso['urlCapa'] = dadosVideo.items[0].snippet.thumbnails.medium.url;
        }
    }

    async matricularCurso(cursoId: string) {
        const confirmMatricula = confirm('Tem certeza que deseja matricular nesse curso?');

        if (confirmMatricula) {
            const payload = {
                aluno: this.minhaMatricula,
                curso: cursoId
            };

            const resMatricula: any = await this._ws.insertMatriculas(payload).toPromise();
            if (resMatricula.success) {
                this.listCursos();
            } else
                alert('Tente Novamente');
        }
        // minhaMatricula
    }

    visualizarCurso(idMatricula){
        console.log(idMatricula);
        this.router.navigate(['aula', idMatricula])
    }

}
