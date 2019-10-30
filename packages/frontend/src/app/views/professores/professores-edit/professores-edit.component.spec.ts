import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresEditComponent } from './professores-edit.component';

describe('ProfessoresEditComponent', () => {
  let component: ProfessoresEditComponent;
  let fixture: ComponentFixture<ProfessoresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessoresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
