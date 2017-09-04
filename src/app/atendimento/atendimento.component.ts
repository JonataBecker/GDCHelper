import { Component, OnInit } from '@angular/core';


import { WebserviceService } from 'app/webservice.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {

  public atendimentos;
  public maiorTempo;
  public maiorQuantidade;

  constructor(
    private webservice: WebserviceService
  ) { }

  ngOnInit() {
    this.webservice.get('atendimentos/historico').subscribe((res) => {
      debugger;
      this.atendimentos = res.json();
      [this.maiorTempo, this.maiorQuantidade] = this.buildMaiorTempoQuantidade(this.atendimentos);
    })
  }

  private buildMaiorTempoQuantidade(atendimentos) {
    let maiorTempo = 0;
    let maiorQuantidade = 0;
    atendimentos.forEach((atendimento) => {
      if (atendimento.quantidade > maiorQuantidade) {
        maiorQuantidade = atendimento.quantidade;
      }
      if (atendimento.tempo > maiorTempo) {
        maiorTempo = atendimento.tempo;
      }
    });


    return [maiorTempo, maiorQuantidade];
  }


}
