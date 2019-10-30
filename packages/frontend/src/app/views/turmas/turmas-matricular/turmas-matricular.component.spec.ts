import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasMatricularComponent } from './turmas-matricular.component';

describe('TurmasMatricularComponent', () => {
  let component: TurmasMatricularComponent;
  let fixture: ComponentFixture<TurmasMatricularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasMatricularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasMatricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
