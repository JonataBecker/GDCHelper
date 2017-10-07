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

  public atendimentoQuantidade:Chart;

  constructor(private webservice: WebserviceService) { }

  ngOnInit() {
    this.buildAtendientoQuantidade();
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

}
