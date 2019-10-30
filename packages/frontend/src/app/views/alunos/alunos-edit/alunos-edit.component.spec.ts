import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosEditComponent } from './alunos-edit.component';

describe('AlunosEditComponent', () => {
  let component: AlunosEditComponent;
  let fixture: ComponentFixture<AlunosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
