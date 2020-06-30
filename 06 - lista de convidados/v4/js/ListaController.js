class ListaController {
  constructor() {
    this.contador = 0;
    this.idEdicao = null;
  }

  lerConvidado() {
    let convidado = {};

    convidado.nome = document.getElementById("nomeConvidado").value;
    convidado.idade = document.getElementById("idadeConvidado").value;

    if (document.querySelector("input[type=radio]:checked") == null) {
      convidado.sexo = "";
    } else {
      convidado.sexo = document.querySelector(
        "input[type=radio]:checked"
      ).value;
    }

    return convidado;
  }

  salvar() {
    let convidado = this.lerConvidado();

    if (this.validar(convidado)) {
      if (this.idEdicao == null) {
        this.adicionar(convidado);
      } else {
        this.salvaEdicao(convidado);
      }

      this.limpar();
    }
  }

  adicionar(convidado) {
    this.inserirLinha(convidado);
    this.contador++;
  }

  inserirLinha(convidado) {
    let tabela = document.getElementById("tabela");

    let linha = tabela.insertRow();
    linha.id = "linha-" + this.contador;

    let colunaNome = linha.insertCell();
    let colunaIdade = linha.insertCell();
    let colunaSexo = linha.insertCell();
    let colunaExcluir = linha.insertCell();
    let colunaEditar = linha.insertCell();

    colunaNome.innerText = convidado.nome;
    colunaIdade.innerText = convidado.idade;
    colunaSexo.innerText = convidado.sexo;

    let imgExcluir = document.createElement("img");
    imgExcluir.src = "img/deletar.svg";
    imgExcluir.setAttribute(
      "onclick",
      `listaController.remover(${this.contador})`
    );

    colunaExcluir.appendChild(imgExcluir);

    let imgEditar = document.createElement("img");
    imgEditar.src = "img/editar.svg";
    imgEditar.setAttribute(
      "onclick",
      `listaController.editar(${this.contador}, ${JSON.stringify(convidado)})`
    );

    colunaEditar.appendChild(imgEditar);
  }

  editar(id, convidado) {
    this.idEdicao = id;

    document.getElementById("nomeConvidado").value = convidado.nome;
    document.getElementById("idadeConvidado").value = convidado.idade;

    if (convidado.sexo == "M") {
      document.getElementById("masc").checked = true;
    } else {
      document.getElementById("fem").checked = true;
    }
  }

  salvaEdicao(convidado) {
    let elementoEditar = document.getElementById("linha-" + this.idEdicao);
    elementoEditar.children[0].innerText = convidado.nome;
    elementoEditar.children[1].innerText = convidado.idade;
    elementoEditar.children[2].innerText = convidado.sexo;

    this.idEdicao = null;
  }

  limpar() {
    document.getElementById("nomeConvidado").value = "";
    document.getElementById("idadeConvidado").value = "";
    this.idEdicao = null;
    let elSexo = document.querySelector("input[type=radio]:checked");

    if (elSexo != null) {
      elSexo.checked = false;
    }
  }

  validar(convidado) {
    let mensagens = "";

    if (convidado.nome == "") {
      mensagens += "Campo nome é obrigatório! \n";
    }

    if (convidado.idade == "") {
      mensagens += "Campo idade é obrigatório! \n";
    }

    if (convidado.sexo == "") {
      mensagens += "Selecione o sexo do convidado! \n";
    }

    if (mensagens != "") {
      this.imprimirMensagem(mensagens);
      return false;
    }

    return true;
  }

  imprimirMensagem(mensagem) {
    alert(mensagem);
  }

  remover(id) {
    let idRemover = "linha-" + id;

    if (confirm("Tem certeza que deseja remover esta linha?")) {
      this.removerLinha(idRemover);
    }
  }
  removerLinha(id) {
    document.getElementById(id).remove();
  }
}

let listaController = new ListaController();
