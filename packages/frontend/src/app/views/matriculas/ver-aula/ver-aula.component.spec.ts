import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAulaComponent } from './ver-aula.component';

describe('VerAulaComponent', () => {
  let component: VerAulaComponent;
  let fixture: ComponentFixture<VerAulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
