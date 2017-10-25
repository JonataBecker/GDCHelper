import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'filtro'
})
export class FiltroCarteiraPipe implements PipeTransform {

  transform(registros: Array<any>, filtro: any): any {
    if (registros == null) {
      return [];
    }
    return registros.filter(registro => {
      if (Array.isArray(registro)) {registro = registro[0];}
      if (filtro.codigo != "" && registro.codigo != filtro.codigo) {
        return false;
      }
      if (filtro.fantasia != "" && registro.nomeFantasia != filtro.fantasia) {
        return false;
      }
      if (filtro.cidade != "" && registro.cidade != filtro.cidade) {
        return false;
      }
      if (filtro.data != "") {
        if (registro.dataCadastro == undefined) {
          return false;
        }
        let [dataIni, dataFim] = filtro.data.split(' - ');
        let dataRegistro = moment(registro.dataCadastro.substr(0, 10), "YYYY-MM-DD").format("DD-MM-YYYY");
        if (moment(dataRegistro, "DD-MM-YYYY").isBefore(moment(dataIni, "DD-MM-YYYY")) || moment(dataRegistro, "DD-MM-YYYY").isAfter(moment(dataFim, "DD-MM-YYYY"))) {
          return false;
        }
      }
      if (filtro.conceito.length > 0) {
        let ehConceito = false;
        for (let conceito of filtro.conceito) {
          if (registro.conceito == conceito) {
            ehConceito = true;
          }
        }
        if (!ehConceito) {
          return false;
        }
      }
      if (filtro.uf.length > 0) {
        let ehUf = false;
        for (let estado of filtro.uf) {
          if (registro.uf == estado) {
            ehUf = true;
          }
        }
        if (!ehUf) {
          return false;
        }
      }
      if (filtro.sistemas.length > 0) {
        if (registro.sistemas == undefined) {
          return false;
        }
        let temSistema = false;
        for (let sistema of filtro.sistemas) {
          if (registro.sistemas.indexOf(sistema) >= 0) {
            temSistema = true;
          }
        }
        if (!temSistema) {
          return false;
        }
      }
      return true;
    });
  }

}
