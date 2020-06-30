class ListaController {
  constructor() {
    this.convidados = [];
    this.idEdicao = null;
  }

  buscarConvidados() {
    fetch("https://fdp-2018-modulo2.herokuapp.com/convidados")
      .then((resposta) => {
        return resposta.json();
      })
      .then((convidados) => {
        this.convidados = convidados;
        this.gerarTabela();
      });
  }

  salvarBancoDeDados(convidado) {
    fetch("https://fdp-2018-modulo2.herokuapp.com/convidados", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(convidado),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((json) => {
        console.log(json);
        this.buscarConvidados();
      });
  }

  deletarBancoDeDados(id) {
    if (confirm("Tem certeza que deseja excluir este convidado?")) {
      fetch("https://fdp-2018-modulo2.herokuapp.com/convidados/" + id, {
        method: "DELETE",
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((respostaBody) => {
          if (respostaBody.kind === undefined) {
            this.buscarConvidados();
          }
        });
    }
  }

  editarBancoDeDados(convidado) {
    fetch(
      "https://fdp-2018-modulo2.herokuapp.com/convidados/" + this.idEdicao,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(convidado),
      }
    )
      .then((resposta) => {
        return resposta.json();
      })
      .then((json) => {
        this.buscarConvidados();
      });
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
    this.salvarBancoDeDados(convidado);
  }

  gerarTabela() {
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    for (let i = 0; i < this.convidados.length; i++) {
      this.inserirLinha(this.convidados[i]);
    }
  }

  inserirLinha(convidado) {
    let tabela = document.getElementById("tabela");

    let linha = tabela.insertRow();

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
      `listaController.deletarBancoDeDados('${convidado._id}')`
    );

    colunaExcluir.appendChild(imgExcluir);

    let imgEditar = document.createElement("img");
    imgEditar.src = "img/editar.svg";
    imgEditar.setAttribute(
      "onclick",
      `listaController.editar(${JSON.stringify(convidado)})`
    );

    colunaEditar.appendChild(imgEditar);
  }

  editar(convidado) {
    this.idEdicao = convidado._id;

    document.getElementById("nomeConvidado").value = convidado.nome;
    document.getElementById("idadeConvidado").value = convidado.idade;

    if (convidado.sexo == "M") {
      document.getElementById("masc").checked = true;
    } else {
      document.getElementById("fem").checked = true;
    }
  }

  salvaEdicao(convidado) {
    this.editarBancoDeDados(convidado);
  }

  limpar() {
    document.getElementById("nomeConvidado").value = "";
    document.getElementById("idadeConvidado").value = "";
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
}

let listaController = new ListaController();
