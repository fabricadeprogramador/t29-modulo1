class LoginController {
  lerUsuario() {
    let usuario = {};

    usuario.username = document.getElementById("username").value;
    usuario.password = document.getElementById("senha").value;

    return usuario;
  }

  validar(usuario) {
    let mensagem = "";

    if (usuario.username == "") mensagem += "Preencha o campo username!\n";
    if (usuario.password == "") mensagem += "Preencha o campo password!\n";

    if (mensagem != "") {
      alert(mensagem);
      return false;
    }

    return true;
  }

  autenticar() {
    let usuario = this.lerUsuario();

    if (this.validar(usuario)) {
      let resultadoLS = localStorage.getItem(usuario.username);

      if (resultadoLS == null) {
        alert("Username inválido!");
      } else {
        let userLS = JSON.parse(resultadoLS);

        if (usuario.password == userLS.password) {
          alert(
            "Login realizado com sucesso!\nRedirecionando para página inicial..."
          );
          location = "home.html?nome=" + userLS.nome;
        } else {
          alert("Senha inválida!");
        }
      }
    }
  }

  carregarNome() {
    let url = decodeURI(location.href);

    let pos = url.lastIndexOf("=");

    let nome = url.slice(pos + 1);

    document.getElementById("nomeLogado").innerText = nome;
  }
}

let loginController = new LoginController();
