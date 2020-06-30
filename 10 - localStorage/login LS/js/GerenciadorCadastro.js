class GerenciadorCadastro {
  lerUsuario() {
    let usuario = {};

    usuario.nome = document.getElementById("nome").value;
    usuario.username = document.getElementById("username").value;
    usuario.password = document.getElementById("password").value;

    return usuario;
  }

  validar(usuario) {
    let mensagem = "";

    if (usuario.nome == "") mensagem += "Preencha o campo name!\n";
    if (usuario.username == "") mensagem += "Preencha o campo username!\n";
    if (usuario.password == "") mensagem += "Preencha o campo password!\n";

    if (mensagem != "") {
      alert(mensagem);
      return false;
    }

    return true;
  }

  salvar() {
    let usuario = this.lerUsuario();

    if (this.validar(usuario)) {
      this.salvarLS(usuario);
      alert("Usuário cadastrado com sucesso!\nRedirecionando para o login...");
      location = "login.html";
    }
  }

  salvarLS(usuario) {
    if (typeof Storage !== "undefined")
      localStorage.setItem(usuario.username, JSON.stringify(usuario));
    else alert("O sistema precisa de suporte ao Web Storage!");
  }
}

let gerenciadorCadastro = new GerenciadorCadastro();
