import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { WebserviceService } from 'app/webservice.service';
import { UsuarioLogado } from 'app/usuario/usuario-logado';
import * as jquery from 'jquery';


@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  public clientes;
  public sistemasDisponiveis;
  public gdc:string;
  public loading:boolean;
  public pesquisa;
  public codigoFiltro:string;
  public nomeFiltro:string;
  public dataFiltro:string;
  public conceitoFiltro:any;
  public cidadeFiltro:string;
  public ufFiltro:any;
  public sistemaFiltro:any;
  public clienteFiltros:any;
  public sortModel;

  constructor(private webservice: WebserviceService, private usuarioLogado: UsuarioLogado) { }

  ngOnInit() {
    this.sortModel = [];
    this.gdc = "";
    this.clienteFiltros = {};
    this.usuarioLogado.getUsuario().subscribe((usu) => {
        this.gdc = usu;
        this.filter();
    });
    const data = new  URLSearchParams();
    this.webservice.get('sistemas', data).subscribe((res) => {
      this.sistemasDisponiveis = res.json();
    });
    (<any>$('#fieldConceito')).select2().on('change', () => {
      this.conceitoFiltro = (<any>$('#fieldConceito')).val();
    });
    (<any>$('#fieldUf')).select2().on('change', () => {
      this.ufFiltro = (<any>$('#fieldUf')).val();
    });
    (<any>$('#fieldSistema')).select2().on('change', () => {
      this.sistemaFiltro = (<any>$('#fieldSistema')).val();
    });
    (<any>$('#fieldData')).daterangepicker(
      {
        locale: {
          format: 'DD-MM-YYYY'
        }
    });
    (<any>$('#fieldData')).on('apply.daterangepicker', () => {
      this.dataFiltro = (<any>$('#fieldData')).val();
    });
    this.limpaFiltros();
  }

  filter() {
    this.clientes = null;
    this.load(this.gdc);
  }

  load(gdc:string) {
    this.loading = true;
    const data = new  URLSearchParams();
    data.append('gdc', gdc);
    data.append('ordem', this.sortModel.map(order => order.replace("-", " DESC").replace("+", " ASC")).join(','));
    this.webservice.get('cliente', data).subscribe((res) => {
      this.clientes = res.json();
      this.loading = false;
    });
  }

  limpaFiltros() {
    this.codigoFiltro = "";
    this.nomeFiltro = "";
    this.dataFiltro = "";
    this.conceitoFiltro = [];
    this.cidadeFiltro = "";
    this.ufFiltro = [];
    this.sistemaFiltro = [];
    (<any>$('#fieldConceito')).val(this.conceitoFiltro);
    (<any>$('#fieldConceito')).trigger('change');
    (<any>$('#fieldUf')).val(this.ufFiltro);
    (<any>$('#fieldUf')).trigger('change');
    (<any>$('#fieldSistema')).val(this.sistemaFiltro);
    (<any>$('#fieldSistema')).trigger('change');
    (<any>$('#fieldData')).val(this.dataFiltro);
    (<any>$('#fieldData')).trigger('change');
    this.aplicaFiltros();
  }

  aplicaFiltros() {
    this.clienteFiltros = {
      codigo: this.codigoFiltro,
      fantasia: this.nomeFiltro,
      data: this.dataFiltro,
      conceito: this.conceitoFiltro,
      cidade: this.cidadeFiltro,
      uf: this.ufFiltro,
      sistemas: this.sistemaFiltro,
    }
  }

}
