import { Component, OnInit } from '@angular/core';
import { AdminLTE } from './AdminLTE'
import { WebserviceService } from './webservice.service';
import { UsuarioLogado } from 'app/usuario/usuario-logado';
import { Usuario } from 'app/usuario/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  public usuarios;
  public usuario;
  public usuarioRech;

  constructor(
    private adminLTE:AdminLTE,
    private webservice: WebserviceService,
    private usuarioLogado: UsuarioLogado
  ) {
  }

  ngOnInit() {
    this.adminLTE.fix();
    this.usuarioRech = new Usuario('', 'Rech');
    this.usuario = this.usuarioRech;
    this.webservice.get('usuarios').subscribe((usuarios) => {
        this.usuarios = usuarios.json().map((usu) => {
          return new Usuario(usu.apelido, usu.nome);
        });
        const founded = this.usuarios.find((usuario) =>  {
          return usuario.getUsuario() == this.usuarioLogado.getUsuarioLogado();
        });
        if (founded) {
          this.usuario = founded;
        }
    });
  }

  selectUsuario(usuario) {
    this.usuario = usuario;
    this.usuarioLogado.login(usuario);
  }
}
