import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Chart } from 'angular-highcharts';
import { WebserviceService } from 'app/webservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public cliente;
  public contatos;
  public historicoSatisfacao;
  public historicoAtualizacao;
  public nomeFiltro:string;
  public cargoFiltro:string;
  public sistemas;
  public sortContato = [];
  public sortSistema = [];
  public idCliente;
  public dataUltimoAtendimento;

  constructor(private webservice: WebserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.nomeFiltro = "";
    this.cargoFiltro = "";
    this.route.params.subscribe(params => {
      this.idCliente = params['idCliente'];
      this.webservice.get('cliente/' + params['idCliente'], null).subscribe((res) => {
        this.cliente = res.json();
      });
      this.webservice.get(`cliente/${params['idCliente']}/atendimento/ultimo`, null).subscribe((res) => {
        this.dataUltimoAtendimento = res.json().data;
      });
      this.updateContato();
      this.updateSistema();

      this.webservice.get('score?filter=cliente=' + params['idCliente'], null).subscribe((res) => {
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
            type: 'area',
            height: 150
          },
          xAxis: {
            categories: Object.keys(byPeriod)
          },
          title: {
            text: ''
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
                text: 'Positivo',
                style: {
                  color: '#606060'
                }
              }
            }, {
              from: 0.0,
              to: -1.0,
              color: 'rgba(255, 0, 0, 0.1)',
              label: {
                text: 'Negativo',
                style: {
                  color: '#606060'
                }
              }
            }]
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

      this.webservice.get(`cliente/${params['idCliente']}/trocasVersao`, null).subscribe((res) => {
        let registros = res.json().map(registro=>{ return [moment(registro[1]).toDate().getTime(), registro[0]] });
        registros = registros.sort((r1,r2)=>{
          return r1[0] - r2[0];
        })
        this.historicoAtualizacao = new Chart({
          chart: {
            type: 'spline',
            height: 250
          },
          title: {
              text: '',
          },
          yAxis: {
            labels: {
              enabled: false,
            },
            title: {
              enabled: false,
            },
          },
          xAxis: {
              type: 'datetime',
              labels: {
                  overflow: 'justify'
              },

              plotBands: registros.map((registro, index) => {

                let nextDate;
                if (index == registros.length - 1) {
                  nextDate = moment().toDate();
                } else {
                  nextDate = moment(registros[index+1][0]).toDate();
                }

                return {
                   from: moment(registro[0]).toDate(),
                   to: nextDate,
                   color: index %2 == 0 ? 'rgba(192, 192, 192, 0.1)':'rgba(0, 0, 0, 0)',
                   label: {
                       text: registro[1],
                       verticalAlign: index %2 == 0 ? "top" : "middle",
                       style: {
                           color: '#606060',
                           fontSize: '7pt'
                       }
                   }
                 }
              })

          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: [{
              data: registros.map(registro=>{return [registro[0], 1]})
          }]
        });
      });

    });

  }

  updateContato() {
    const data = new  URLSearchParams();
    data.append('idCliente', this.idCliente);
    data.append('ordem', this.sortContato.map(order => order.replace("-", " DESC").replace("+", " ASC")).join(','));
    this.webservice.get('contatos', data).subscribe((res) => {
      this.contatos = res.json();
    });
  }

  updateSistema() {
    const data = new  URLSearchParams();
    data.append('idCliente', this.idCliente);
    data.append('ordem', this.sortSistema.map(order => order.replace("-", " DESC").replace("+", " ASC")).join(','));
    this.webservice.get('sistema', data).subscribe((res) => {
      this.sistemas = res.json();
    });
  }

}
