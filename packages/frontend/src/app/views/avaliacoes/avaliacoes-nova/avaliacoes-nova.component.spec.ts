import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoesNovaComponent } from './avaliacoes-nova.component';

describe('AvaliacoesNovaComponent', () => {
  let component: AvaliacoesNovaComponent;
  let fixture: ComponentFixture<AvaliacoesNovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacoesNovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacoesNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
