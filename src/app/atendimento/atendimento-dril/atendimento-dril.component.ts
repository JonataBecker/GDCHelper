import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { WebserviceService } from 'app/webservice.service';
import { AtendimentoService } from '../atendimento.service';

@Component({
  selector: 'app-atendimento-dril',
  templateUrl: './atendimento-dril.component.html'
})
export class AtendimentoDrilComponent implements OnInit {

  public contatos;
  public maiorTempoContato;
  public maiorQuantidadeContato;
  public sistemas;
  public maiorTempoSistema;
  public maiorQuantidadeSistema;

  constructor(
    private webservice: WebserviceService,
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const data = new  URLSearchParams();
      data.append('dataInicial', params['dataInicial']);
      data.append('dataFinal', params['dataFinal']);
      data.append('idCliente', params['idCliente']);
      // Busca histórico de atendimento de contatos
      this.webservice.get('atendimentos/historico/contato', data).subscribe((res) => {
        this.contatos = res.json();
        [this.maiorTempoContato, this.maiorQuantidadeContato] = this.atendimentoService.buildMaiorTempoQuantidade(this.contatos);
      });
      // Busca histórico de atendimento de sistemas
      this.webservice.get('atendimentos/historico/sistema', data).subscribe((res) => {
        this.sistemas = res.json();
        [this.maiorTempoSistema, this.maiorQuantidadeSistema] = this.atendimentoService.buildMaiorTempoQuantidade(this.sistemas);
      });
    });
  }

}
