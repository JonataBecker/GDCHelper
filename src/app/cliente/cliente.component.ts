import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Chart } from 'angular-highcharts';
import { WebserviceService } from 'app/webservice.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public cliente;
  public contatos;
  public historicoSatisfacao;
  public nomeFiltro:string;
  public cargoFiltro:string;
  public sistemas;

  constructor(private webservice: WebserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.nomeFiltro = "";
    this.cargoFiltro = "";
    let idCliente;
    this.route.params.subscribe(params => {
      idCliente = params['idCliente'];
      this.webservice.get('cliente/' + params['idCliente'], null).subscribe((res) => {
        this.cliente = res.json();
      });
      const data = new  URLSearchParams();
      data.append('idCliente', idCliente);
      this.webservice.get('contatos', data).subscribe((res) => {
        this.contatos = res.json();
      });
      this.webservice.get('sistema', data).subscribe((res) => {
        this.sistemas = res.json();
      });

      this.webservice.get('score?filter=cliente=' + params['idCliente'], null).subscribe((res) => {

        console.log(res.json());
        let byPeriod = res.json().reduce((totalized, record) => {
          let period = record.dataCriacao.substr(0,7);
          if (totalized[period] == undefined) {
            totalized[period] = {
              total: 0,
              count: 0
            };
          }
          totalized[period].total += record.score;
          totalized[period].count++;
          return totalized;
        }, {});

        Object.keys(byPeriod).map(function(key, index) {
           byPeriod[key] = byPeriod[key].total / byPeriod[key].count;
        });

        var data = Object.keys(byPeriod).reduce((previous, current) => {
            previous.push(byPeriod[current]);
            return previous;
        }, []);

        this.historicoSatisfacao = new Chart({
          chart: {
            type: 'area'
          },
          xAxis: {
            categories: Object.keys(byPeriod)
          },
          yAxis: {
            title: {
                text: 'Score'
            },
            min: -1,
            max: 1,
            plotBands: [{
              from: 0.0,
              to: 1.0,
              color: 'rgba(0, 255, 60, 0.1)',
              label: {
                text: 'Positive',
                style: {
                  color: '#606060'
                }
              }
            }, {
              from: 0.0,
              to: -1.0,
              color: 'rgba(255, 0, 0, 0.1)',
              label: {
                text: 'Negative',
                style: {
                  color: '#606060'
                }
              }
            }]
          },
          title: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: [{
            name: 'quantidade',
            data: data
          }]
        });

      });

    });

  }

}
