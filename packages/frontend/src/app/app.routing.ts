import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';

import {LoginComponent} from './views/login/login.component';
import {AlunosComponent} from './views/alunos/alunos.component';
import {AlunosEditComponent} from './views/alunos/alunos-edit/alunos-edit.component';
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
import {AuthGuardService} from './auth-guard.service';
import {QuestoesComponent} from './views/questoes/questoes.component';
import {QuestoesEditComponent} from './views/questoes/questoes-edit/questoes-edit.component';
import {QuestoesNewComponent} from './views/questoes/questoes-new/questoes-new.component';
import {AvaliacoesComponent} from './views/avaliacoes/avaliacoes.component';
import {AvaliacoesNovaComponent} from './views/avaliacoes/avaliacoes-nova/avaliacoes-nova.component';
import {AvaliacoesQuestoesComponent} from './views/avaliacoes/avaliacoes-questoes/avaliacoes-questoes.component';
import {MinhasTurmasComponent} from './views/minhas-turmas/minhas-turmas.component';
import {MinhasTurmasDisciplinaComponent} from './views/minhas-turmas/minhas-turmas-disciplina/minhas-turmas-disciplina.component';
import {ResponderProvaComponent} from './views/responder-prova/responder-prova.component';
import {UsuariosComponent} from "./views/usuarios/usuarios.component";
import {UsuariosEditComponent} from "./views/usuarios/usuarios-edit/usuarios-edit.component";
import {CursosComponent} from "./views/cursos/cursos.component";
import {CursosEditComponent} from "./views/cursos/cursos-edit/cursos-edit.component";
import {RelatorioAlunoCursoComponent} from "./views/relatorio-aluno-curso/relatorio-aluno-curso.component";
import {MatriculasComponent} from "./views/matriculas/matriculas.component";
import {VerAulaComponent} from "./views/matriculas/ver-aula/ver-aula.component";
import {RelatorioCursoProfessorComponent} from "./views/relatorio-curso-professor/relatorio-curso-professor.component";
import {RelatorioAlunosConcluintesCursoComponent} from "./views/relatorio-alunos-concluintes-curso/relatorio-alunos-concluintes-curso.component";
import {RelatorioVendasMensaisComponent} from "./views/relatorio-vendas-mensais/relatorio-vendas-mensais.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'All'
        },
        children: [
            {
                path: 'usuario',
                component: UsuariosComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'usuario/add',
                component: UsuariosEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'usuario/edit/:id',
                component: UsuariosEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'alunos',
                component: AlunosComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'alunos/add',
                component: AlunosEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'alunos/edit/:id',
                component: AlunosEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'alunos/turma/:id',
                component: AlunosTurmaComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'professores',
                component: ProfessoresComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'professores/add',
                component: ProfessoresEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'professores/edit/:id',
                component: ProfessoresEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'professores/turma/:id',
                component: ProfessoresTurmaComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cursos',
                component: CursosComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cursos/add',
                component: CursosEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cursos/edit/:id',
                component: CursosEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'minhas-disciplinas',
                component: DisciplinasComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'disciplinas',
                component: DisciplinasComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'disciplinas/add',
                component: DisciplinasEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'disciplinas/edit/:id',
                component: DisciplinasEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'turmas',
                component: TurmasComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'turmas/add',
                component: TurmasEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'turmas/edit/:id',
                component: TurmasEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'turmas/matriculas/:id',
                component: TurmasMatriculasComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'turmas/matriculas/ver-notas/:id/:idAluno',
                component: MinhasTurmasDisciplinaComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'matricular/turma/:id',
                component: TurmasMatricularComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'questoes/disciplina/:id',
                component: QuestoesComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'questoes/disciplina/add/:id/:newQuestion',
                component: QuestoesNewComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'questoes/disciplina/edit/:id',
                component: QuestoesEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'avaliacao',
                component: AvaliacoesComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'avaliacao/add',
                component: AvaliacoesNovaComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'avaliacao/questoes/:id',
                component: AvaliacoesQuestoesComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'minhas-turmas',
                component: MinhasTurmasComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'minhas-turmas/:id',
                component: MinhasTurmasDisciplinaComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'responder-prova/:idAval/:idTurma',
                component: ResponderProvaComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'relatorio-aluno-curso',
                component: RelatorioAlunoCursoComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'relatorio-curso-professor',
                component: RelatorioCursoProfessorComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'relatorio-alunos-concluintes-curso',
                component: RelatorioAlunosConcluintesCursoComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'relatorio-vendas-mensais',
                component: RelatorioVendasMensaisComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'matriculas',
                component: MatriculasComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'aula/:id',
                component: VerAulaComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'base',
                loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
