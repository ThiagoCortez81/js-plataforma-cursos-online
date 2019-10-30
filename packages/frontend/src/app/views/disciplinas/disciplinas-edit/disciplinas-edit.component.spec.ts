import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinasEditComponent } from './disciplinas-edit.component';

describe('DisciplinasEditComponent', () => {
  let component: DisciplinasEditComponent;
  let fixture: ComponentFixture<DisciplinasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
