import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-questoes-edit',
    templateUrl: './questoes-edit.component.html',
    styleUrls: ['./questoes-edit.component.scss']
})
export class QuestoesEditComponent implements OnInit {
    private questao = {
        alt2: '',
        alt3: '',
        alt4: '',
        altCorreta: '',
        enunciado: '',
        idDisc: '',
        idQues: ''
    };
    private isNew = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.getQuestao(id);
    }

    getQuestao(id) {
        this.http.get(`http://localhost:5000/buscar-questao?id=${id}`, {}).subscribe((questao: any) => {
            this.questao = questao;
        });
    }

    salvarQuestao() {
        const data = {
            alt2: this.questao.alt2,
            alt3: this.questao.alt3,
            alt4: this.questao.alt4,
            altCerta: this.questao.altCorreta,
            enumQuest: this.questao.enunciado,
            DiscId: this.questao.idDisc,
            QuestId: this.questao.idQues
        };

        if (!this.isNew) {
            this.http.post(`http://localhost:5000/edit-questao`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['questoes/disciplina/', this.questao.idDisc]);
                } else {
                    alert('Erro ao alterar questao. Tente novamente');
                }
            });
        } else {
            this.http.post(`http://localhost:5000/add-questao`, data).subscribe((res: any) => {
                if (res.result == 'Ok!') {
                    this.router.navigate(['questaos']);
                } else {
                    alert('Erro ao alterar questao. Tente novamente');
                }
            });
        }
    }

}
