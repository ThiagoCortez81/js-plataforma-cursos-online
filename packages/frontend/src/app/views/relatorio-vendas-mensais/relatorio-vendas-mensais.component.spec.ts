import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendasMensaisComponent } from './relatorio-vendas-mensais.component';

describe('RelatorioVendasMensaisComponent', () => {
  let component: RelatorioVendasMensaisComponent;
  let fixture: ComponentFixture<RelatorioVendasMensaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioVendasMensaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendasMensaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
