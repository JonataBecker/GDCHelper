import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import * as moment from 'moment';
import * as jquery from 'jquery';
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
  public date:string;
  public gdc:string;

  constructor(
    private webservice: WebserviceService
  ) { }

  ngOnInit() {
    const ini =  moment().subtract(3, 'months').format('DD-MM-YYYY');
    const fim = moment().format('DD-MM-YYYY');
    this.date = ini + " - " + fim;
    this.gdc = "";
    let me = this;
    (<any>$('#reservation')).daterangepicker(
      {
        locale: {
          format: 'DD-MM-YYYY'
        },
        startDate: ini,
        endDate: fim
      });
      (<any>$('#reservation')).on('apply.daterangepicker', function(ev, picker) {
        me.date = (<any>$('#reservation')).val();
        me.filter();
      });
      this.load(ini, fim, "");
  }

  private buildMaiorTempoQuantidade(atendimentos) {
    let maiorTempo = 0;
    let maiorQuantidade = 0;
    atendimentos.forEach((atendimento) => {
      atendimento.tempo = parseFloat(atendimento.tempo);
      if (atendimento.quantidade > maiorQuantidade) {
        maiorQuantidade = atendimento.quantidade;
      }
      if (atendimento.tempo > maiorTempo) {
        maiorTempo = atendimento.tempo;
      }
    });
    return [maiorTempo, maiorQuantidade];
  }

  load(ini:string, fim:string, gdc:string) {
    const data = new  URLSearchParams();
    data.append('dataInicial', moment(ini, "DD/MM/YYYY").format("YYYY-MM-DD"));
    data.append('dataFinal', moment(fim, "DD/MM/YYYY").format("YYYY-MM-DD"));
    data.append('gdc', gdc);
    this.webservice.get('atendimentos/historico', data).subscribe((res) => {
      this.atendimentos = res.json();
      [this.maiorTempo, this.maiorQuantidade] = this.buildMaiorTempoQuantidade(this.atendimentos);
    });
  }

  filter() {
    let [ini, fim] = this.date.split(' - ');
    this.load(ini, fim, this.gdc);
  }
}
