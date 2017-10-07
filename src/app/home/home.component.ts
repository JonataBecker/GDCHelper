import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Chart } from 'angular-highcharts';
import { WebserviceService } from 'app/webservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clientes;
  public gdc:string;
  public loading:boolean;
  public atendimentoQuantidade:Chart;
  public atendimentoTempo:Chart;
  public pesquisa;

  constructor(private webservice: WebserviceService) { }

  ngOnInit() {
    this.gdc = "";
    this.buildAtendientoQuantidade();
    this.buildAtendientoTempo();
  }

  buildAtendientoQuantidade() {
    this.webservice.get('dash/atendimento/quantidade', null).subscribe((res) => {
      const data = res.json();
      this.atendimentoQuantidade = new Chart({
        chart: {
          type: 'line'
        },
        xAxis: {
          categories: data.map((it) => {
            return it.periodo;
          })
        },
        title: {
          text: 'Quantidade de atendimentos por período'
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'quantidade',
          data: data.map((it) => {
            return it.quantidade;
          })
        }]
      });
    });
  }

  buildAtendientoTempo() {
    this.webservice.get('dash/atendimento/tempo', null).subscribe((res) => {
      const data = res.json();
      console.log(data.map((it) => {
        return it.tempo;
      }));



      this.atendimentoTempo = new Chart({
        chart: {
          type: 'line'
        },
        xAxis: {
          categories: data.map((it) => {
            return it.periodo;
          })
        },
        title: {
          text: 'Tempo total de atendimentos por período'
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'tempo',
          data: data.map((it) => {
            return parseFloat(it.tempo);
          })
        }]
      });
    });
  }

  filter() {
    this.clientes = null;
    this.load(this.gdc);
  }

  load(gdc:string) {
    this.loading = true;
    const data = new  URLSearchParams();
    data.append('gdc', gdc);
    this.webservice.get('cliente', data).subscribe((res) => {
      this.clientes = res.json();
      this.loading = false;
    });
  }

  search() {

  }

}
