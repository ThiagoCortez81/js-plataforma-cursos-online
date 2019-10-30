import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresTurmaComponent } from './professores-turma.component';

describe('ProfessoresTurmaComponent', () => {
  let component: ProfessoresTurmaComponent;
  let fixture: ComponentFixture<ProfessoresTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessoresTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoresTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
