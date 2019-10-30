import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasTurmasComponent } from './minhas-turmas.component';

describe('MinhasTurmasComponent', () => {
  let component: MinhasTurmasComponent;
  let fixture: ComponentFixture<MinhasTurmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasTurmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
