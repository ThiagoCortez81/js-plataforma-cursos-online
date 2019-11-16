import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioCursoProfessorComponent } from './relatorio-curso-professor.component';

describe('RelatorioCursoProfessorComponent', () => {
  let component: RelatorioCursoProfessorComponent;
  let fixture: ComponentFixture<RelatorioCursoProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioCursoProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioCursoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
