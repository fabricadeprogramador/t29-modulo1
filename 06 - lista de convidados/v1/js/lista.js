var nomeConvidado = "";
var lista = "";
class GerenciadorLista {
  lerConvidado() {
    nomeConvidado = document.getElementById("nomeConvidado").value;
  }

  adicionarConvidado() {
    this.lerConvidado();

    if (nomeConvidado != "") {
      lista += nomeConvidado + "\n";
      document.getElementById("lista").innerText = lista;
      this.limpar();
    } else {
      alert("Preencha o campo do nome do convidado!");
    }
  }

  limpar() {
    document.getElementById("nomeConvidado").value = "";
  }
}

let gerenciador = new GerenciadorLista();
