import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroContato'
})
export class FiltroContatoPipe implements PipeTransform {

  transform(registros: Array<any>, nome:string, cargo:string): any {
    if (registros == null) {
      return [];
    }
    return registros.filter(registro => {
      if (nome.toUpperCase() != "" && registro.nome.toUpperCase().indexOf(nome.toUpperCase()) < 0) {
        return false;
      }
      if (cargo.toUpperCase() != "" && registro.cargo.toUpperCase().indexOf(cargo.toUpperCase()) < 0) {
        return false;
      }
      return true;
    });
  }

}
