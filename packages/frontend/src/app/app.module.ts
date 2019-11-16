import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import {AppComponent} from './app.component';

// Import containers
import {DefaultLayoutComponent} from './containers';

const APP_CONTAINERS = [
    DefaultLayoutComponent
];

import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts';
import {AlunosComponent} from './views/alunos/alunos.component';
import {HttpClientModule} from '@angular/common/http';
import {AlunosEditComponent} from './views/alunos/alunos-edit/alunos-edit.component';
import {FormsModule} from '@angular/forms';
import {AlunosTurmaComponent} from './views/alunos/alunos-turma/alunos-turma.component';
import {ProfessoresComponent} from './views/professores/professores.component';
import {ProfessoresEditComponent} from './views/professores/professores-edit/professores-edit.component';
import {ProfessoresTurmaComponent} from './views/professores/professores-turma/professores-turma.component';
import {DisciplinasComponent} from './views/disciplinas/disciplinas.component';
import {DisciplinasEditComponent} from './views/disciplinas/disciplinas-edit/disciplinas-edit.component';
import {TurmasComponent} from './views/turmas/turmas.component';
import {TurmasEditComponent} from './views/turmas/turmas-edit/turmas-edit.component';
import {TurmasMatricularComponent} from './views/turmas/turmas-matricular/turmas-matricular.component';
import {TurmasMatriculasComponent} from './views/turmas/turmas-matriculas/turmas-matriculas.component';
import {AuthenticationService} from './authentication.service';
import { QuestoesComponent } from './views/questoes/questoes.component';
import { QuestoesEditComponent } from './views/questoes/questoes-edit/questoes-edit.component';
import { QuestoesNewComponent } from './views/questoes/questoes-new/questoes-new.component';
import { AvaliacoesComponent } from './views/avaliacoes/avaliacoes.component';
import { AvaliacoesNovaComponent } from './views/avaliacoes/avaliacoes-nova/avaliacoes-nova.component';
import { AvaliacoesQuestoesComponent } from './views/avaliacoes/avaliacoes-questoes/avaliacoes-questoes.component';
import { MinhasTurmasComponent } from './views/minhas-turmas/minhas-turmas.component';
import { MinhasTurmasDisciplinaComponent } from './views/minhas-turmas/minhas-turmas-disciplina/minhas-turmas-disciplina.component';
import { ResponderProvaComponent } from './views/responder-prova/responder-prova.component';
import {LoginComponent} from './views/login/login.component';
import { NgSelect2Module } from 'ng-select2';
import {UsuariosComponent} from "./views/usuarios/usuarios.component";
import {UsuariosEditComponent} from "./views/usuarios/usuarios-edit/usuarios-edit.component";
import { CursosComponent } from './views/cursos/cursos.component';
import { CursosEditComponent } from './views/cursos/cursos-edit/cursos-edit.component';
import { RelatorioAlunoCursoComponent } from './views/relatorio-aluno-curso/relatorio-aluno-curso.component';
import { MatriculasComponent } from './views/matriculas/matriculas.component';
import { VerAulaComponent } from './views/matriculas/ver-aula/ver-aula.component';
import { RelatorioCursoProfessorComponent } from './views/relatorio-curso-professor/relatorio-curso-professor.component';
import { RelatorioAlunosConcluintesCursoComponent } from './views/relatorio-alunos-concluintes-curso/relatorio-alunos-concluintes-curso.component';
import { RelatorioVendasMensaisComponent } from './views/relatorio-vendas-mensais/relatorio-vendas-mensais.component';



@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        HttpClientModule,
        FormsModule,
        NgSelect2Module
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        LoginComponent,
        UsuariosComponent,
        UsuariosEditComponent,
        AlunosComponent,
        AlunosEditComponent,
        AlunosTurmaComponent,
        ProfessoresComponent,
        ProfessoresEditComponent,
        ProfessoresTurmaComponent,
        DisciplinasComponent,
        DisciplinasEditComponent,
        TurmasComponent,
        TurmasEditComponent,
        TurmasMatricularComponent,
        TurmasMatriculasComponent,
        QuestoesComponent,
        QuestoesEditComponent,
        QuestoesNewComponent,
        AvaliacoesComponent,
        AvaliacoesNovaComponent,
        AvaliacoesQuestoesComponent,
        MinhasTurmasComponent,
        MinhasTurmasDisciplinaComponent,
        ResponderProvaComponent,
        CursosComponent,
        CursosEditComponent,
        RelatorioAlunoCursoComponent,
        MatriculasComponent,
        VerAulaComponent,
        RelatorioCursoProfessorComponent,
        RelatorioAlunosConcluintesCursoComponent,
        RelatorioVendasMensaisComponent
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
