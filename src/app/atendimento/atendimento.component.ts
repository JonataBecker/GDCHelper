import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as jquery from 'jquery';
import { WebserviceService } from 'app/webservice.service';
import { AtendimentoService } from './atendimento.service';
import { UsuarioLogado } from 'app/usuario/usuario-logado';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html'
})
export class AtendimentoComponent implements OnInit {

  public atendimentos;
  public maiorTempo;
  public maiorQuantidade;
  public date:string;
  public gdc:string;
  public cliente:string;

  constructor (
    private router: Router,
    private webservice: WebserviceService,
    private atendimentoService: AtendimentoService,
    private usuarioLogado: UsuarioLogado
  ) { }

  ngOnInit() {
    const ini =  moment().subtract(3, 'months').format('DD-MM-YYYY');
    const fim = moment().format('DD-MM-YYYY');
    this.date = ini + " - " + fim;
    this.gdc = "";
    this.cliente = "";
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
      this.usuarioLogado.getUsuario().subscribe((usu) => {
          this.gdc = usu;
          this.filter();
      });
  }

  /**
   * Formata data
   * 
   * @param data 
   */
  private getDate(data) {
    return moment(data, "DD/MM/YYYY").format("YYYY-MM-DD");
  }

  /**
   * Carrega atendimentos
   * 
   * @param ini 
   * @param fim 
   * @param gdc 
   * @param cliente 
   */
  load(ini:string, fim:string, gdc:string, cliente:string) {
    const data = new  URLSearchParams();
    data.append('dataInicial', this.getDate(ini));
    data.append('dataFinal', this.getDate(fim));
    data.append('gdc', gdc);
    data.append('cliente', cliente);
    this.webservice.get('atendimentos/historico', data).subscribe((res) => {
      this.atendimentos = res.json();
      [this.maiorTempo, this.maiorQuantidade] = this.atendimentoService.buildMaiorTempoQuantidade(this.atendimentos);
    });
  }

  /**
   * Executa filtro de atendimentos
   */
  filter() {
    let [ini, fim] = this.date.split(' - ');
    this.load(ini, fim, this.gdc, this.cliente);
  }

  /**
   * Executa drill de atendimentos
   * 
   * @param atendimento 
   */
  dril(atendimento:any) {
    let [ini, fim] = this.date.split(' - ');
    this.router.navigate(['/atendimento', atendimento.idCliente, this.getDate(ini), this.getDate(fim)]);
  }
}
