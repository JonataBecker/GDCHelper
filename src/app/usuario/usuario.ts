export class Usuario {

  constructor(private usuario:string, private nome: string) {
  }

  getUsuario() {
    return this.usuario;
  }

  getNome() {
    return this.nome;
  }

}
