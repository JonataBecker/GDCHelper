import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { WebserviceService } from 'app/webservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-atendimento',
  templateUrl: './cliente-atendimento.component.html',
  styleUrls: ['./cliente-atendimento.component.css']
})
export class ClienteAtendimentoComponent implements OnInit {

  public atendimentos;

  constructor(private webservice: WebserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let contato = '';
      if (params['codigoContato']) {
        contato = '/' + params['codigoContato'];
      }
      this.webservice.get(`cliente/${params['idCliente']}/atendimento${contato}`, null).subscribe((res) => {
        this.atendimentos = res.json();
      });
    });
  }

  /**
   * Abre informações do atendimento
   * 
   * @param atendimento 
   */
  openAtendimento(atendimento) {
    atendimento.click = !atendimento.click;
  }

  /**
   * Exible classificação
   * 
   * @param id 
   */
  showClassificacao(id) {
    let atendimento = this.atendimentos.find(atendimento => atendimento.id == id);
    const data = new  URLSearchParams();
    data.append('text', atendimento.mensagem);
    this.webservice.get(`score/compute`, data).subscribe((res) => {
      atendimento.mensagemClassificada = res.json();
      atendimento.mensagemClassificada.forEach(record => record.class = ((record.score+1) / 2 * 20).toFixed(0));
    });
  }

  classifica(frase, classe) {
    this.webservice.post(`score/treina`, {
      classificacao: classe,
      texto: frase
    }).subscribe();
  }

}
