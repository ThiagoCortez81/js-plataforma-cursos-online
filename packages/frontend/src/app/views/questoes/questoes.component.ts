import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-questoes',
    templateUrl: './questoes.component.html',
    styleUrls: ['./questoes.component.scss']
})
export class QuestoesComponent implements OnInit {
    questoes: Array<any>;
    idQuestao = '';
    private textoQuestao = '';
    idDisciplina;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        console.log(this.route.snapshot.paramMap)
        this.idDisciplina = +this.route.snapshot.paramMap.get('id');
        console.log(this.idDisciplina)
        this.listQuestoes();
    }

    listQuestoes() {
        this.http.get(`http://localhost:5000/listar-questao?id=${this.idDisciplina}`).subscribe((listQuestoes: Array<any>) => {
            this.questoes = listQuestoes;
        });
    }

    editQuestao(id) {
        this.router.navigate(['questoes/disciplina/edit', id]);
    }

    adicionarQuestao() {
        this.router.navigate(['questoes/disciplina/add', this.idDisciplina, 1]);
    }

    excluirQuestao(id) {
        if (confirm(`Deseja mesmo remover este questao? (ID: ${id})`)) {
            const data = {
                QuestId: id
            };

            this.http.post(`http://localhost:5000/del-questao`, data).subscribe((res: any) => {
                console.log(res.result);
                console.log(res.result == 'Ok!');
                if (res.result == 'Ok!') {
                    this.listQuestoes();
                } else {
                    alert('Erro ao remover questao. Tente novamente');
                }
            });
        }
    }

}
