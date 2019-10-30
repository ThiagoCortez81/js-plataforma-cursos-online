import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoesQuestoesComponent } from './avaliacoes-questoes.component';

describe('AvaliacoesQuestoesComponent', () => {
  let component: AvaliacoesQuestoesComponent;
  let fixture: ComponentFixture<AvaliacoesQuestoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacoesQuestoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacoesQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
