import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WebserviceService} from "../../../services/webservice/webservice.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-ver-aula',
    templateUrl: './ver-aula.component.html',
    styleUrls: ['./ver-aula.component.scss']
})
export class VerAulaComponent implements OnInit {
    id: any;
    matricula: any;

    constructor(private route: ActivatedRoute, private _ws: WebserviceService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.buscarDadosMatricula(this.id);
    }

    async buscarDadosMatricula(id) {
        this.matricula = await this._ws.listarMatriculas(id).toPromise();
    }

    finalizarAula() {
        const confirmRes = confirm('Tem certeza que deseja finalizar o curso?');
        if (confirmRes) {
            const matricula = this.matricula.matricula;

            matricula.dataFinalizacao = new Date().toISOString();
            matricula.emAndamento = false;

            const response: any = this._ws.updateMatriculas(matricula).toPromise();
            if (response.success) {
                this.buscarDadosMatricula(this.id);
            }
        }
    }

    urlAula() {
        const video = this.matricula.curso.urlVideoaula.split('v=');
        const idVideo = video[1];

        return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${idVideo}?&autoplay=1`);
    }

}
