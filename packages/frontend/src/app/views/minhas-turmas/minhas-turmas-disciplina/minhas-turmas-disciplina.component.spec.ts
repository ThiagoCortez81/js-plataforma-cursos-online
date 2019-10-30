import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasTurmasDisciplinaComponent } from './minhas-turmas-disciplina.component';

describe('MinhasTurmasDisciplinaComponent', () => {
  let component: MinhasTurmasDisciplinaComponent;
  let fixture: ComponentFixture<MinhasTurmasDisciplinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasTurmasDisciplinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasTurmasDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
