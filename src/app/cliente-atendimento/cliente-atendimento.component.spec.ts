import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAtendimentoComponent } from './cliente-atendimento.component';

describe('ClienteAtendimentoComponent', () => {
  let component: ClienteAtendimentoComponent;
  let fixture: ComponentFixture<ClienteAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAtendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
