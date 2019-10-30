import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderProvaComponent } from './responder-prova.component';

describe('ResponderProvaComponent', () => {
  let component: ResponderProvaComponent;
  let fixture: ComponentFixture<ResponderProvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponderProvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
