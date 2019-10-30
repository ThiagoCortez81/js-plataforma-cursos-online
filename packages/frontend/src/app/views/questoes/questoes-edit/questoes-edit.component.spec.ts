import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestoesEditComponent } from './questoes-edit.component';

describe('QuestoesEditComponent', () => {
  let component: QuestoesEditComponent;
  let fixture: ComponentFixture<QuestoesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestoesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestoesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
