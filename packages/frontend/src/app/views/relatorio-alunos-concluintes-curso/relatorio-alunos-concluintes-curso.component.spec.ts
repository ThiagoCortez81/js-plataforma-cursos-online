import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAlunosConcluintesCursoComponent } from './relatorio-alunos-concluintes-curso.component';

describe('RelatorioAlunosConcluintesCursoComponent', () => {
  let component: RelatorioAlunosConcluintesCursoComponent;
  let fixture: ComponentFixture<RelatorioAlunosConcluintesCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAlunosConcluintesCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAlunosConcluintesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
