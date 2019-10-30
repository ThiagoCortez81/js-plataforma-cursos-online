import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-avaliacoes-questoes',
    templateUrl: './avaliacoes-questoes.component.html',
    styleUrls: ['./avaliacoes-questoes.component.scss']
})
export class AvaliacoesQuestoesComponent implements OnInit {
    idDisciplina;
    idAval;
    listQuestoes;
    questao = {
        alt2: '',
        alt3: '',
        alt4: '',
        altCorreta: '',
        enunciado: '',
        idDisc: '',
        idQues: ''
    };

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.idDisciplina = JSON.parse(this.route.snapshot.paramMap.get('id'));
        console.log(this.idDisciplina);
        this.listaQuestoes();
    }

    listaQuestoes() {
        this.http.get(`http://localhost:5000/listar-questao-avaliacao?id=${this.idDisciplina.DiscID}&aval=${this.idDisciplina.idAval}`, {}).subscribe((listQuestoes: Array<any>) => {
            this.listQuestoes = listQuestoes;
        });
    }

    adicionarQuestao() {
        this.router.navigate(['questoes/disciplina/add', this.idDisciplina.DiscID, 1]);
    }

    syncPresent(objQuestao) {
        setTimeout(() => {
            const data = {
                idAvaliacao: this.idDisciplina.idAval,
                idQuestao: objQuestao.idQues,
                selected: objQuestao.selected
            };

            this.http.post(`http://localhost:5000/add-questao-avaliacao`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    alert('Salvo com sucesso!');
                } else {
                    alert('Erro ao criar avaliacao. Tente novamente');
                }
            });
        }, 500);
    }

}
