import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAlunoCursoComponent } from './relatorio-aluno-curso.component';

describe('RelatorioAlunoCursoComponent', () => {
  let component: RelatorioAlunoCursoComponent;
  let fixture: ComponentFixture<RelatorioAlunoCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAlunoCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAlunoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
