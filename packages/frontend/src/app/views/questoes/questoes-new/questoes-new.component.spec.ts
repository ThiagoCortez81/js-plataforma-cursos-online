import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestoesNewComponent } from './questoes-new.component';

describe('QuestoesNewComponent', () => {
  let component: QuestoesNewComponent;
  let fixture: ComponentFixture<QuestoesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestoesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestoesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
