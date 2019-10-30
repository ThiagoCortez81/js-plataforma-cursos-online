import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosTurmaComponent } from './alunos-turma.component';

describe('AlunosTurmaComponent', () => {
  let component: AlunosTurmaComponent;
  let fixture: ComponentFixture<AlunosTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunosTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
