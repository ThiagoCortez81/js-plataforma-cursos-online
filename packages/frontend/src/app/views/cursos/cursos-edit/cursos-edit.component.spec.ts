import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosEditComponent } from './cursos-edit.component';

describe('CursosEditComponent', () => {
  let component: CursosEditComponent;
  let fixture: ComponentFixture<CursosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
