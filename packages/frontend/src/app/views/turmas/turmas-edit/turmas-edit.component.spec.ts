import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasEditComponent } from './turmas-edit.component';

describe('TurmasEditComponent', () => {
  let component: TurmasEditComponent;
  let fixture: ComponentFixture<TurmasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
