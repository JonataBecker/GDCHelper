import { Injectable } from '@angular/core';

@Injectable()
export class AtendimentoService {

  constructor() { }

  /**
   * Retorna qual foi o maior tempo e a maior quantidade
   * 
   * @param atendimentos 
   */
  buildMaiorTempoQuantidade(atendimentos) {
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

}
