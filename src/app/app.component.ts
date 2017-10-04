import { Component, OnInit } from '@angular/core';
import { AdminLTE } from './AdminLTE'
import { WebserviceService } from './webservice.service';
import { UsuarioLogado } from 'app/usuario/usuario-logado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  public usuarios;
  public usuario;

  constructor(
    private adminLTE:AdminLTE,
    private webservice: WebserviceService,
    private usuarioLogado: UsuarioLogado
  ) {
  }

  ngOnInit() {
    this.adminLTE.fix();
    this.usuario = { nome : 'Rech' };
    this.webservice.get('usuarios').subscribe((usuarios) => {
        this.usuarios = usuarios.json();
        const founded = this.usuarios.
          find((usuario) => usuario == this.usuarioLogado.getUsuarioLogado());
        if (founded != -1) {
          this.usuario = founded;
        }
    });
  }

  selectUsuario(usuario) {
    this.usuario = usuario;
    this.usuarioLogado.login(usuario);
  }
}
