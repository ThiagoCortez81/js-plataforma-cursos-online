import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasMatriculasComponent } from './turmas-matriculas.component';

describe('TurmasMatriculasComponent', () => {
  let component: TurmasMatriculasComponent;
  let fixture: ComponentFixture<TurmasMatriculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasMatriculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasMatriculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
