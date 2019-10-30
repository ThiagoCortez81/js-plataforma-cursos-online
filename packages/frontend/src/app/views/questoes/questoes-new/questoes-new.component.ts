import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-questoes-new',
  templateUrl: './questoes-new.component.html',
  styleUrls: ['./questoes-new.component.scss']
})
export class QuestoesNewComponent implements OnInit {
    questao = {
        alt2: '',
        alt3: '',
        alt4: '',
        altCorreta: '',
        enunciado: '',
        idDisc: 0,
        idQues: ''
    };

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.questao.idDisc = +this.route.snapshot.paramMap.get('id');
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

        this.http.post(`http://localhost:5000/add-questao`, data).subscribe((res: any) => {
            if (res.result == 'Ok!') {
                this.router.navigate(['questoes/disciplina/', this.questao.idDisc]);
            } else {
                alert('Erro ao alterar questao. Tente novamente');
            }
        });
    }

}
