import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesquisa'
})
export class PesquisaPipe implements PipeTransform {

  transform(registros: Array<any>, pesquisa: any, campos: Array<string>): any {
    if (pesquisa == undefined) {
      return registros;
    }
    if (registros == null) {
      return [];
    }
    return registros.filter(registro => {
      if (Array.isArray(registro)) {registro = registro[0];}
      if (campos == undefined) {
        campos = Object.keys(registro);
      }
      for (let campo of campos) {
        if (registro[campo] != undefined) {
          if (typeof registro[campo] != "number") {
            if (registro[campo].toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0) {
              return true;
            }
          } else {
            if (registro[campo] == pesquisa) {
              return true;
            }
          }
        }
      }
      return false;
    });
  }

}
